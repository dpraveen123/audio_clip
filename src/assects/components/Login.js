import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";

import {
  Upload,
  Button,

} from "antd";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      isDisabled: true
      // countryCode:''
    }
  }

  sendOtp = () => {

    let userData = {
      MobileNumber: this.state.mobileNumber.substring(3, 13),
      CountryCode: this.state.mobileNumber.substring(0, 3)
    }
    console.log(userData);
    axios.post('https://identitydev.elyments.in/api/Identity/GenerateOtp/V2', userData)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

  }
  render() {
    return (
      <div>
        <Typography
          sx={{ fontSize: 20, marginBottom: 3, color: "#8B139E", marginTop: 5 }}
          color="text.secondary"
          gutterBottom
          className="Heading"
        >
          Post Clip
        </Typography>
        <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          className="title"
          required={true}
          onChange={(value) => {
            console.log(value.target.value);
            this.state.mobileNumber = value.target.value
            this.setState({ mobileNumber: this.state.mobileNumber })
            if (this.state.mobileNumber.length == 13) {
              this.setState({ isDisabled: false })
            }
            else {
              this.setState({ isDisabled: true })
            }

          }}
        />
        <div style={{ alignItems: "center", textAlign: "center" }}>
          <Link to={{
            pathname: "/otppage",
            state: { mobilenumber: this.state.mobileNumber }
          }}>       <Button
            onClick={this.sendOtp}
            variant="contained"
            disabled={this.state.isDisabled}
            style={{
              marginTop: 35,
              textAlign: "center",
              backgroundColor: "#8B139E",
              color: "white",
              borderRadius: 5,
            }}
          >
              Send OTP
            </Button></Link>
        </div>
      </div>
    );
  }
}
