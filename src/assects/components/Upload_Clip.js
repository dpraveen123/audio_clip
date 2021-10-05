import React from "react";
import {
  Upload,
  Button,

} from "antd";
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




var props = {
  // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  // status: 'done',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log("file status", file.status);
      // file.status = 'done'
      console.log("files", fileList,);
    }
  },
  defaultFileList: [
    // {
    //   uid: '1',
    //   name: 'xxx.png',
    //   status: 'done',
    //   response: 'Server Error 500', // custom error message to show
    //   url: 'http://www.baidu.com/xxx.png',
    // },
    // {
    //   uid: '2',
    //   name: 'yyy.png',
    //   status: 'done',
    //   url: 'http://www.baidu.com/yyy.png',
    // },
    // {
    //   uid: '3',
    //   name: 'zzz.png',
    //   status: 'error',
    //   response: 'Server Error 500', // custom error message to show
    //   url: 'http://www.baidu.com/zzz.png',
    // },
  ],
};
// var props = {
//   action: "https://elymentsstoragedev.blob.core.windows.net/audio-cast/e14620572f544e84a3587532864d74b3?st=2021-08-06T01%3A37%3A02Z&se=2021-08-06T04%3A57%3A02Z&sp=w&sv=2018-03-28&sr=b&sig=eeRRQEW2uJsGrHxwjI6xF0UB4%2BT1d%2F3gJFiX%2B0sJ5X0%3D",
//   onChange({ file, fileList }) {
//     if (file.status !== "uploading") {

//       console.log(file);
//     }
//   }
// };


class Upload_Clip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDescriptionEmpty: 0,
      isChannelIdEmpty: 0,
      isLanguageEmpty: 0,
      data: [],
      Language: [],
      channelId: '',
      description: '',
      duration: 10,
      languages: [],
      objectId: 'sample',
      tags: [],
      isEmpty: 0,
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

  componentDidMount() {
    let config = {
      headers: {
        "Accept": "application/json",
        // "Content-Type": "application/json"
      }
    }
    axios.get(`https://clipsdev.elyments.in/api/internal/Channels`, config)
      .then(res => {
        console.log("config", res.data, config);
        this.setState({ data: res.data });
        console.log(this.state.data);

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

    if (this.state.channelId == '' || this.state.description == '' || this.state.Language.length == 0) {
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

  postData = () => {

    // axios.get(`https://chatdev.elyments.in/api/azure/upload/url/1?container=audio`)
    //   .then(res => {
    //     console.log("audio", res.data);
    //     this.setState({ objectId: res.data.objectId })
    //     // this.setState({ data: persons });
    //     // console.log(this.state.data);
    //   })

    // this.formValidations()
    // console.log("selected languages are", this.state.Language)
    var userData = {
      channelId: this.state.channelId,
      description: this.state.description,
      duration: this.state.duration,
      languages: this.state.Language,
      objectId: "e14620572f544e84a3587532864d74b3",
      tags: this.state.tags
    }
    console.log(userData);
    let config = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    }
    axios.post(`https://clipsdev.elyments.in/api/internal/Clips`, userData, config)
      .then(res => {
        console.log(res);
        console.log(res.data);
        swal({
          title: "Good job!",
          text: "Succesfully uploaded clip",
          icon: "success",
          button: "Okay",
        });
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
    this.setState({ tags: [] })
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
          helperText={this.state.isChannelIdEmpty === 1 ? "Please fill out this field." : ""}
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
              this.state.data.map((l) => {
                // console.log(l);
                return (
                  <MenuItem value={l.id} >{l.name} </MenuItem>
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

                  control={<Checkbox checked={l.isChecked} onChange={() => this.handleChange(index, l.lan)} />}
                  label={l.lan}
                />
              )
            })

          }
        </FormGroup>
        <p style={{ fontSize: 12, color: "red" }}> {this.state.isLanguageEmpty === 1 ? "Please select anyone out this fields." : ""}</p>

        <div style={{ marginTop: 15 }}>
          <Upload {...props} accept={".mp3"} >
            <Button icon={<UploadOutlined style={{ color: "#8B139E", fontWeight: "bold" }} />} style={{ fontWeight: 500 }}> Upload</Button>
          </Upload>
        </div>
        <div style={{ marginTop: 15 }}>
          <FormLabel > Tags</FormLabel>
        </div>
        <div className="box">
          <EditableTagGroup callBack={this.getTags} />
        </div>
        <div style={{ alignItems: "center", textAlign: "center" }}>
          <Button onClick={this.formValidations} variant="contained" style={{ marginTop: 35, textAlign: "center", backgroundColor: "#8B139E", color: "white", borderRadius: 5 }}>Upload Clip</Button>
        </div>
      </div>
    );
  }
}

export default Upload_Clip;
