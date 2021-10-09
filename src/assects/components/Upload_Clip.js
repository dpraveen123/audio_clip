import React from "react";
import {
  Upload,
  Button,
  message

} from "antd";
// import reqwest from 'reqwest';
// import { EventRegister } from 'react-events-listeners'
import swal from 'sweetalert';
import { DownOutlined, UploadOutlined } from "@ant-design/icons";
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
import Title from "antd/lib/skeleton/Title";
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation, withRouter, Redirect

} from "react-router-dom";



class Upload_Clip extends React.Component {
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
      duration: 10,
      languages: [],
      objectId: "",
      tags: [],
      fileList: [],
      uploading: false,
      isEmpty: 0,
      isFileListEmpty:0,
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
        // {
        //   lan: "Spanish",
        //   isChecked: false,
        //   index: 2
        // },
        // {
        //   lan: "Tamil",
        //   isChecked: false,
        //   index: 3
        // },
        // {
        //   lan: "Kannada",
        //   isChecked: false,
        //   index: 4
        // },
        // {
        //   lan: "Telugu",
        //   isChecked: false,
        //   index: 5
        // },
        // {
        //   lan: "Marathi",
        //   isChecked: false,
        //   index: 6
        // },
        // {
        //   lan: "Bengali",
        //   isChecked: false,
        //   index: 7
        // },
        // {
        //   lan: "Marathi",
        //   isChecked: false,
        //   index: 8
        // },
        // {
        //   lan: "Malayalam",
        //   isChecked: false,
        //   index: 9
        // }
      ]
    }
  }



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

      console.log(fileList);
      let formData = new FormData();
      formData.append("file", fileList[0]);

      // You can use any AJAX library you like
      axios.put(this.state.fileUploadURL, formData, requestConfig).then((res) => {
        console.log(res);
        resolve(res.data);
      }).catch((err) => {
        console.error(err);
        reject(err);
      });
    });
  };
  componentDidMount = async () => {
    console.log("accsess token from otppage is", this.props.location.accessToken)
    if(this.props.location.accessToken==undefined){
      this.props.history.replace('/')

    }
    this.setState({ accessToken: this.props.location.accessToken })
    // console.log("props in main page", this.props.location.accessToken);
    this.getChannels();
  }

  getChannels = () => {
    let config = {
      headers: {
        "Accept": "application/json",
        // "Content-Type": "application/json"
      }
    }
    axios.get(`https://clipsdev.elyments.in/api/internal/Channels`, config)
      .then(res => {
        console.log("config", res.status);
        if (res.status == 401) {
          swal({
            title: "Oops! An Error has occured!",
            text: "Please try again...",
            icon: "warning",
            button: "Okay",
          });
          // this.props.history.go(-2);

          this.props.history.replace('/')
          // return (
          //   <Redirect from="/home" to="/" ></Redirect>

          // )
        }
        this.setState({ data: res.data });

      })
      .catch(() => {
        swal({
          title: "Oops! An Error has occured!",
          text: "Please try again...",
          icon: "warning",
          button: "Okay",
        });
        // this.getChannels();
      })
  }

  formValidations = () => {

    if (this.state.description == '') {
      this.setState({ isDescriptionEmpty: 1 })
    }
    else {
      this.setState({ isDescriptionEmpty: 0 })
    }
    if (this.state.channelId == '') {
      this.setState({ isChannelIdEmpty: 1 })
    }
    else {
      this.setState({ isChannelIdEmpty: 0 })
    }
    if (this.state.Language.length == 0) {
      this.setState({ isLanguageEmpty: 1 })
    }
    else {
      this.setState({ isLanguageEmpty: 0 })
    }
    if(this.state.fileList.length==0){
      this.setState({isFileListEmpty:1})
    }
    if (this.state.channelId == '' || this.state.description == '' || this.state.Language.length == 0|| this.state.fileList.length== 0)  {
      this.setState({ isEmpty: 1 })
      // alert("please fill out required fields.")
      // this.postData()
      // console.log("isEmpty");
    }
    else {
      this.postData()
    }
    // if(this.state.description!='')
  }

  postData = async () => {

    let config1 = {
      headers: {
        "Authorization": this.state.accessToken,
        // "Content-Type": "application/json"
      }
    }
    let getUploadURLResponse = await axios.get(`https://chatdev.elyments.in/api/azure/upload/url?container=audio`, config1).catch(() => {
      swal({
        title: "Oops! An Error has occured!",
        text: "Please try again...",
        icon: "warning",
        button: "Okay",
      });
    });
    console.log(getUploadURLResponse.data);
    this.setState({ fileUploadURL: getUploadURLResponse.data.url });
    this.setState({ objectId: getUploadURLResponse.data.objectId });
    await this.handleUpload().catch(() => {
      swal({
        title: "Oops! An Error has occured!",
        text: "Please try again...",
        icon: "warning",
        button: "Okay",
      });
    });
    // 401?phonenumber:oops went wrong! 
    this.postFinalData();
  }

getFilePath=(options)=>{
  console.log("hllo i am custome request",options)
}
  postFinalData = () => {
    var userData = {
      channelId: this.state.channelId,
      description: this.state.description,
      duration: this.state.duration,
      languages: this.state.Language,
      objectId: this.state.objectId,
      tags: this.state.tags
    }
    // console.log(userData, "this is final data to upload");
    let config = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    }
    axios.post(`https://virtserver.swaggerhub.com/fragmadata/Clips-WebUpload/1.0.0/api/internal/Clips`, userData, config)
      .then(res => {
        // console.log(res);
        // console.log(res.data);
        swal({
          title: "Good job!",
          text: "Succesfully uploaded clip",
          icon: "success",
          button: "Okay",
        });
        if (res.status == 401) {
          swal({
            title: "Oops! An Error has occured!",
            text: "Please try again...",
            icon: "warning",
            button: "Okay",
          });
          this.props.history.replace('/')
        }
        this.state.channelId = ""
        this.setState({ channelId: this.state.channelId })
        this.setState({ description: '' })
        this.setState({ duration: '' })
        for (var i = 0; i < this.state.checked.length; i++) {
          this.state.checked[i].isChecked = false;
          this.setState({ checked: this.state.checked })
        }
        // EventRegister.emit('myCustomEvent', 'it works!!!')
        this.setState({ Language: [] })
        this.setState({ objectId: '' })
        this.setState({ tags: [] })
        this.setState({ fileList: [] })
        this.removeTags()
      })
      .catch((e) => {
        swal({
          title: "An Error has occured!",
          text: "Please try uploading again...",
          icon: "warning",
          button: "Okay",
        });
      })

  }

  removeTags = () => {
    this.state.tags = [];
    this.setState({ tags: this.state.tags })
    // console.log("doing tags empty", this.state.tags)
  }
  getTags = (data) => {
    this.setState({ tags: data })
    // console.log("data succes", data);
  }
  handleChange = (index, value) => {
    this.state.checked[index].isChecked = !this.state.checked[index].isChecked


    this.setState({
      checked: this.state.checked
    })
    // console.log("ischecked", this.state.checked);
    this.state.Language = []
    this.setState({ Language: this.state.Language })
    this.state.checked.map(l => {
      if (l.isChecked === true) {
        this.state.Language = this.state.Language.concat(l.index)
        this.setState({ Language: this.state.Language })
      }
    })
    // this.state.languages.concat(event)
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

        console.log("you sected file is",file)
       
        // var url;
        // // var file = document.querySelector("#file").files[0];
        // var reader = new FileReader();
        // reader.onload = function(evt) {
        //   url = evt.target.result;
        //   console.log(url);
        //   var sound = document.createElement("audio");
        //   var link = document.createElement("source");
        //   sound.id = "audio-player";
        //   sound.controls = "controls";
        //   link.src = url;
        //   sound.type = "audio/mpeg";
        //   sound.appendChild(link);
        //   document.getElementById("song").appendChild(sound);
        //   console.log("sound is ", document.querySelector('#song #audio-player'))
        // };
        // reader.readAsDataURL(file);
        // const reader = new FileReader();
        // reader.onload = e => {
        //     console.log(e.target.result,"this is result bro");
        // };
        // reader.readAsText(file);

        // var audio=new Audio(file);
        // audio.play()
        // console.log("audii is",audio,"and duration is",audio.duration)
        this.setState(state => ({
          fileList: [...state.fileList, file],

          isFileListEmpty:0
        }));
      // console.log("you sected file is hehehe",file)

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
            // console.log("discription", value.target.value);
            // this.state.description = value
            this.setState({ description: value.target.value })

          }
            // console.log("description",)
          }
        />
        <p style={{ fontSize: 12, color: "red" }}> {this.state.isDescriptionEmpty === 1 ? "Please fill out this field." : ""}</p>
        <FormControl fullWidth style={{ marginTop: 15 }} required
        // helperText={this.state.isChannelIdEmpty === 1 ? "Please fill out this field." : ""}
        >
          <InputLabel id="demo-simple-select-label">Channel Name</InputLabel>
          <Select
            // required
            // filled={true}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Channel Name"
            value={this.state.channelId}

            onChange={(l) => {
              // console.log("changed value", l.target.value);
              this.setState({ channelId: l.target.value })
            }}
          >
            {
              this.state.data.map((l, i) => {
                // console.log(l);
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
        <p style={{ fontSize: 12, color: "red" }}> {this.state.isLanguageEmpty === 1 ? "Please select anyone out this fields." : ""}</p>

        <div style={{ marginTop: 15 }}>
          <Upload {...props} accept={[".mp3", ".aac"]}
          // onChange={()=>{alert("file uploading")}}
          // customRequest={(op)=>{alert("custom bro")}}
          >
            <Button icon={<UploadOutlined style={{ color: "#8B139E", fontWeight: "bold" }} />} style={{ fontWeight: 500 }}>Select File</Button>
          </Upload>

          <p style={{ fontSize: 12, color: "red" }}> {this.state.isFileListEmpty === 1 ? "Please select .mp3 file  " : ""}</p>
        </div>
        <div style={{ marginTop: 15 }}>
          <FormLabel > Tags</FormLabel>
        </div>
        <div className="box">
          <EditableTagGroup callBack={this.getTags} tags={this.state.tags} />
        </div>
        <div style={{ alignItems: "center", textAlign: "center" }}>
          <Button onClick={this.formValidations} variant="contained" style={{ marginTop: 35, textAlign: "center", backgroundColor: "#8B139E", color: "white", borderRadius: 5 }}>Upload Clip</Button>
        </div>
        <div id="song"></div>
      </div>
    );
  }
}

export default withRouter(Upload_Clip);
