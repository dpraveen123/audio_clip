import React from "react";
import {
  Upload,
  Button,

} from "antd";
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
// import Button from '@mui/material/Button';
// const onClick = ({ key }) => {
//   message.info(`Click on item ${key}`);
// };

// const menu = (
//   <Menu onClick={onClick}>
//     <Menu.Item key="1">1st menu item</Menu.Item>
//     <Menu.Item key="2">2nd menu item</Menu.Item>
//     <Menu.Item key="3">3rd menu item</Menu.Item>
//   </Menu>
// );

// const CheckboxGroup = Checkbox.Group;




// defaultFileList: [
//   {
//     uid: "1",
//     name: "xxx.png",
//     status: "done",
//     response: "Server Error 500", // custom error message to show
//     url: "http://www.baidu.com/xxx.png",
//   },
//   {
//     uid: "2",
//     name: "yyy.png",
//     status: "done",
//     url: "http://www.baidu.com/yyy.png",
//   },
//   {
//     uid: "3",
//     name: "zzz.png",
//     status: "error",
//     response: "Server Error 500", // custom error message to show
//     url: "http://www.baidu.com/zzz.png",
//   },
// ],
var props = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange({ file, fileList }) {
    if (file.status !== "uploading") {
      console.log(file);
    }
  }
};


class Upload_Clip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      Language: [],
      channelId: '',
      description: 'sample',
      duration: 10,
      languages: [],
      objectId: 'sample',
      tags: [],
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
    axios.get(`https://virtserver.swaggerhub.com/fragmadata/Clips-WebUpload/1.0.0/api/internal/Channels`)
      .then(res => {
        const persons = res.data;
        // console.log(persons);
        this.setState({ data: persons });
        console.log(this.state.data);
      })

  }


  postData = () => {
    this.state.Language=[]
       this.setState({Language:this.state.Language})
   this.state.checked.map(l=>{
     if(l.isChecked===true){
       this.state.Language=this.state.Language.concat(l.index)
       this.setState({Language:this.state.Language})
     }
   })
   console.log("selected languages are",this.state.Language)
    var userData = {
      channelId: this.state.channelId,
      description: this.state.description,
      duration: this.state.duration,
      languages: this.state.Language,
      objectId: "e14620572f544e84a3587532864d74b3",
      tags: this.state.tags
    }
    axios.post(`https://virtserver.swaggerhub.com/fragmadata/Clips-WebUpload/1.0.0/api/internal/Clips`, { userData })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
  }


  getTags = (data) => {
    this.setState({ tags: data })
    console.log("data succes", data);
  }
  handleChange = (index, value) => {
    this.state.checked[index].isChecked = !this.state.checked[index].isChecked


    this.setState({

      checked: this.state.checked
    })
    console.log("ischecked", this.state.checked);

    // this.state.languages.concat(event)
  };



  // function Upload_Clip() {

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
          onChange={(value) => {
            this.setState({ description: value })
          }
            // console.log("description",)
          }
        />
        <FormControl fullWidth style={{ marginTop: 15 }}>
          <InputLabel id="demo-simple-select-label">Channel Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Channel Name"
            onChange={(l) => {
              console.log("changed value", l.target.value);
              // this.setState({ channelId: l.id })
            }}
          >
            {
              this.state.data.map((l) => {

                // console.log(l);
                return (
                  <MenuItem value={l.id} >{l.name}</MenuItem>
                )
              })
            }
            {/* <MenuItem value={10}>Channel 1</MenuItem>
            <MenuItem value={20}>Channel 2</MenuItem>
            <MenuItem value={30}>Channel 3</MenuItem> */}
          </Select>
        </FormControl>
        <FormGroup style={{ marginTop: 15 }}>
          <FormLabel component="legend"> Language</FormLabel>
          {
            this.state.checked.map((l, index) => {
              console.log(index)

              return (
                <FormControlLabel
                  control={<Checkbox checked={l.isChecked} onChange={() => this.handleChange(index, l.lan)} />}
                  label={l.lan}
                />
              )
            })

          }
          {/* <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="English"
          />
          <FormControlLabel control={<Checkbox />} label="Hindi" /> */}
        </FormGroup>
        <div style={{ marginTop: 15 }}>
          <Upload {...props} >
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
          <Button onClick={this.postData} variant="contained" style={{ marginTop: 35, textAlign: "center", backgroundColor: "#8B139E", color: "white", borderRadius: 5 }}>Upload Clip</Button>
        </div>
      </div>
    );
  }
}

export default Upload_Clip;
