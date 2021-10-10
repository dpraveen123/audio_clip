/* 
============= UPLOAD CLIP COMPONENT ================
This component contains the clip upload form 
*/

import React from "react";
import { Upload, Button } from "antd";
import swal from 'sweetalert';
import { UploadOutlined } from "@ant-design/icons";
import EditableTagGroup from "./Tag";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import Typography from '@mui/material/Typography';
import axios from 'axios'
import { withRouter } from "react-router-dom";
import { GET_CHANNELS } from "../config/endpoints";
import { GET_FILE_UPLOAD_URL } from "../config/endpoints";
import { FORM_SUBMIT_URL } from "../config/endpoints";
import CircularProgress from '@mui/material/CircularProgress';

// number of retries if get channels API call fails
const retries = 3;


class UploadClip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUploadURL: "",
      isDescriptionEmpty: 0,
      isChannelIdEmpty: 0,
      isLanguageEmpty: 0,
      accessToken: '',
      data: [],
      Language: [],
      channelId: '',
      description: '',
      duration: -1,
      languages: [],
      objectId: "",
      tags: [],
      fileList: [],
      uploading: false,
      isEmpty: 0,
      isFileListEmpty: 0,
      showLoader: false,
      checked: [
        {
          lan: "English",
          isChecked: false,
          index: 0
        },
        {
          lan: "Hindi",
          isChecked: false,
          index: 1
        }
      ]
    }
  }

  // this method will be exec after the component is init'ed
  componentDidMount = async () => {
    if (this.props.location.accessToken === undefined) {
      let token = localStorage.getItem('accessToken');
      if (token) {
        this.setState({ accessToken: token });
      }
      else {
        this.props.history.replace('/')
      }
    }
    else {
      this.setState({ accessToken: this.props.location.accessToken });
    }
    this.getChannels(retries);
  }

  // PUT request to upload the file
  handleUpload = () => {
    return new Promise((resolve, reject) => {
      const { fileList } = this.state;
      let requestConfig = {
        headers: {
          "x-ms-blob-type": "BlockBlob"
        }
      }
      this.setState({
        uploading: true,
      });
      let formData = new FormData();
      formData.append("file", fileList[0]);
      axios.put(this.state.fileUploadURL, formData, requestConfig).then((res) => {
        resolve(res.data);
      }).catch((err) => {
        console.error(err);
        reject(err);
      });
    });
  };


  getChannels = (retries) => {
    let config = {
      headers: {
        "Accept": "application/json",
        // "Content-Type": "application/json"
      }
    }
    axios.get(GET_CHANNELS, config)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch((err) => {
        if (retries != 0) {
          retries = retries - 1;
          this.getChannels(retries);
        }
        else {
          if (err.response.status === 401) {
            swal({
              title: "Token expired",
              text: "Please login again",
              icon: "warning",
              button: "Okay",
            });
            this.props.history.replace('/');
          }
          else {
            this.setState({ showLoader: false })
            swal({
              title: "Oops! An Error has occured!",
              text: "Please try again...",
              icon: "warning",
              button: "Okay",
            });
          }
        }
      })
  }

  //  If all the fields are vaild, upload sequence will be init'ed
  formValidations = () => {

    if (this.state.description === '') {
      this.setState({ isDescriptionEmpty: 1 })
    }
    else {
      this.setState({ isDescriptionEmpty: 0 })
    }
    if (this.state.channelId === '') {
      this.setState({ isChannelIdEmpty: 1 })
    }
    else {
      this.setState({ isChannelIdEmpty: 0 })
    }
    if (this.state.Language.length === 0) {
      this.setState({ isLanguageEmpty: 1 })
    }
    else {
      this.setState({ isLanguageEmpty: 0 })
    }
    if (this.state.fileList.length === 0) {
      this.setState({ isFileListEmpty: 1 })
    }
    if (this.state.channelId === '' || this.state.description === '' || this.state.Language.length === 0 || this.state.fileList.length === 0) {
      this.setState({ showLoader: false })
      this.setState({ isEmpty: 1 })
    }
    else {
      // Data is valid, so we can start uploading the file and submitting the meta data
      this.postData()
    }
  }

  postData = () => {

    let config1 = {
      headers: {
        "Authorization": this.state.accessToken,
        // "Content-Type": "application/json"
      }
    }
    this.setState({showLoader: true});
    axios.get(GET_FILE_UPLOAD_URL, config1).then((getUploadURLResponse) => {
      // console.log(getUploadURLResponse.data);
      this.setState({ fileUploadURL: getUploadURLResponse.data.url });
      this.setState({ objectId: getUploadURLResponse.data.objectId });
      this.handleUpload().then((_) => {
      this.postMetaData();
      }).catch((_err) => {
        if (_err.response.status === 401) {
          swal({
            title: "Token expired",
            text: "Please login again",
            icon: "warning",
            button: "Okay",
          });
          localStorage.clear();
          this.props.history.replace('/');
        }
        else {
          this.setState({ showLoader: false })
          swal({
            title: "Oops! An Error has occured!",
            text: "Please try again...",
            icon: "warning",
            button: "Okay",
          });
        }
      });
    }).catch((err) => {
      if (err.response.status === 401) {
        swal({
          title: "Token expired",
          text: "Please login again",
          icon: "warning",
          button: "Okay",
        });
        localStorage.clear();
        this.props.history.replace('/');
      }
      else {
        this.setState({ showLoader: false })
        swal({
          title: "Oops! An Error has occured!",
          text: "Please try again...",
          icon: "warning",
          button: "Okay",
        });
      }
    });

  }

  postMetaData = () => {
    var userData = {
      channelId: this.state.channelId,
      description: this.state.description,
      duration: this.state.duration,
      languages: this.state.Language,
      objectId: this.state.objectId,
      tags: this.state.tags
    }
    let config = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    }
    axios.post(FORM_SUBMIT_URL, userData, config)
      .then(res => {
        swal({
          title: "Upload completed!",
          text: "The clip is uploaded succesfully.",
          icon: "success",
          button: "Okay",
        });
        this.state.channelId = ""
        this.setState({ channelId: this.state.channelId })
        this.setState({ description: '' })
        this.setState({ duration: -1 })
        for (var i = 0; i < this.state.checked.length; i++) {
          this.state.checked[i].isChecked = false;
          this.setState({ checked: this.state.checked })
        }
        this.setState({ Language: [] })
        this.setState({ objectId: '' })
        this.setState({ tags: [] })
        this.setState({ fileList: [] })
        this.removeTags()
        this.setState({ showLoader: false })
      })
      .catch((err) => {
        if (err.response.status === 401) {
          swal({
            title: "Token expired",
            text: "Please login again",
            icon: "warning",
            button: "Okay",
          });
          localStorage.clear();
          this.props.history.replace('/');
        }
        else {
          this.setState({ showLoader: false })
          swal({
            title: "Oops! An Error has occured!",
            text: "Please try again...",
            icon: "warning",
            button: "Okay",
          });
        }
      });
  }

  removeTags = () => {
    this.state.tags = [];
    this.setState({ tags: this.state.tags })
  }
  getTags = (data) => {
    this.setState({ tags: data })
  }
  handleChange = (index, value) => {
    this.state.checked[index].isChecked = !this.state.checked[index].isChecked
    this.setState({
      checked: this.state.checked
    })
    this.state.Language = []
    this.setState({ Language: this.state.Language })
    this.state.checked.map(l => {
      if (l.isChecked === true) {
        this.state.Language = this.state.Language.concat(l.index)
        this.setState({ Language: this.state.Language })
      }
    })
  };


  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        let audio = document.createElement('audio');
        if (file) {
          let reader = new FileReader();
          reader.onload = (e) => {
            audio.src = e.target.result;
            // console.log(audio.duration);
            audio.addEventListener('loadedmetadata', () => {
              let duration = Math.floor(audio.duration);
              // console.log("The duration of the song is of: " + duration + " seconds");
              this.setState({ duration: duration });
            }, false);
          };

          reader.readAsDataURL(file);
        }
        this.setState(state => ({
          fileList: [file],

          isFileListEmpty: 0
        }));
        return false;

      },
      fileList,
    };

    return (
      <div className='clipBox'>
        <Typography sx={{ fontSize: 20, marginBottom: 3, color: "#8B139E" }} color="text.secondary" gutterBottom className="Heading">
          Post Clip
        </Typography>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          className="title"
          required={true}
          value={this.state.description}
          onChange={(value) => {
            this.setState({ description: value.target.value })
          }
          }
        />
        <p style={{ fontSize: 12, color: "red" }}> {this.state.isDescriptionEmpty === 1 ? "Please fill out this field." : ""}</p>
        <FormControl fullWidth style={{ marginTop: 15 }} required
        >
          <InputLabel id="demo-simple-select-label">Channel Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Channel Name"
            value={this.state.channelId}

            onChange={(l) => {
              this.setState({ channelId: l.target.value })
            }}
          >
            {
              this.state.data.map((l, i) => {
                return (
                  <MenuItem value={l.id} key={i} >{l.name} </MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
        <p style={{ fontSize: 12, color: "red" }}> {this.state.isChannelIdEmpty === 1 ? "Please fill out this field." : ""}</p>
        <FormGroup style={{ marginTop: 15 }}  >
          <FormLabel component="legend"> Language</FormLabel>
          {
            this.state.checked.map((l, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={<Checkbox checked={l.isChecked} onChange={() => this.handleChange(index, l.lan)} />}
                  label={l.lan}
                />
              )
            })

          }
        </FormGroup>
        <p style={{ fontSize: 12, color: "red" }}> {this.state.isLanguageEmpty === 1 ? "Please select atleast one language" : ""}</p>

        <div style={{ marginTop: 15 }}>
          <Upload {...props} accept={[".mp3", ".aac"]} maxCount={1}>
            <Button icon={<UploadOutlined style={{ color: "#8B139E", fontWeight: "bold" }} />} style={{ fontWeight: 500 }}>Select File</Button>
          </Upload>

          <p style={{ fontSize: 12, color: "red" }}> {this.state.isFileListEmpty === 1 ? "Please select a file to upload" : ""}</p>
        </div>
        <div style={{ marginTop: 15 }}>
          <FormLabel > Tags</FormLabel>
        </div>
        <div className="box">
          <EditableTagGroup callBack={this.getTags} tags={this.state.tags} />
        </div>
        <div style={{ alignItems: "center", textAlign: "center" }}>
          <Button onClick={this.formValidations} variant="contained" style={{ marginTop: 35, textAlign: "center", backgroundColor: "#8B139E", color: "white", borderRadius: 5 }} disabled={this.state.showLoader} >{this.state.showLoader === true ? <CircularProgress size="1.5rem" style={{ color: "white", padding: 5 }} /> : "Upload Clip"} </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(UploadClip);
