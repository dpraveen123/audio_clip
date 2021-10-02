import React from "react";
import {
  //   Input,
  //   Menu,
  //   Dropdown,
  //   message,
  //   Checkbox,
  //   Divider,
  Upload,
  Button,
  // Tag,
  //   Tag,
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

// const plainOptions = ["Apple", "Pear", "Orange"];
// const defaultCheckedList = ["Apple", "Orange"];

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

function Upload_Clip() {
  //   const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  //   const [indeterminate, setIndeterminate] = React.useState(true);
  //   const [checkAll, setCheckAll] = React.useState(false);

  //   const onChange = (list) => {
  //     setCheckedList(list);
  //     setIndeterminate(!!list.length && list.length < plainOptions.length);
  //     setCheckAll(list.length === plainOptions.length);
  //   };

  //   const onCheckAllChange = (e) => {
  //     setCheckedList(e.target.checked ? plainOptions : []);
  //     setIndeterminate(false);
  //     setCheckAll(e.target.checked);
  //   };
  // <span style={{ width: 10, backgroundColor: "#8B139E", color: "#8B139E", marginRight: 2 }} >" </span>

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
        // onChange={handleChange}
        >
          <MenuItem value={10}>Channel 1</MenuItem>
          <MenuItem value={20}>Channel 2</MenuItem>
          <MenuItem value={30}>Channel 3</MenuItem>
        </Select>
      </FormControl>
      <FormGroup style={{ marginTop: 15 }}>
        <FormLabel component="legend"> Language</FormLabel>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="English"
        />
        {/* <FormControlLabel control={<Checkbox />} label="Telugu" /> */}
        <FormControlLabel control={<Checkbox />} label="Hindi" />
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

export default Upload_Clip;
