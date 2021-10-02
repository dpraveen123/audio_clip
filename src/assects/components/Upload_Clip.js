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



const props = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange({ file, fileList }) {
    if (file.status !== "uploading") {
      console.log(file, fileList);
    }
  },
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
};

class Upload_Clip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      Language: {
        IndianEnglish: "0",
        Hindi: "1",
        Spanish: "2",
        Tamil: "3",
        Kannada: "4",
        Telugu: "5",
        Marathi: "6",
        Bengali: "7",
        Gujarati: "8",
        Malayalam: "9"
      },
      channelId: '',
      description: 'sample',
      duration: 10,
      languages: [],
      objectId: 'sample',
      tags: []
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

                console.log(l.name);
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
            Object.keys(this.state.Language).map(l => {
              return (
                <FormControlLabel
                  control={<Checkbox />}
                  label={l}
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
          <EditableTagGroup />
        </div>
        <div style={{ alignItems: "center", textAlign: "center" }}>
          <Button variant="contained" style={{ marginTop: 35, textAlign: "center", backgroundColor: "#8B139E", color: "white", borderRadius: 5 }}>Upload Clip</Button>
        </div>
      </div>
    );
  }
}

export default Upload_Clip;
