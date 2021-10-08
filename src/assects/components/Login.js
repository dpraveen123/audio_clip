import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, NavLink,
  useLocation,
  useHistory
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
  componentDidMount = () => {
    console.log("this props is from login.js", this.props)
  }
  sendOtp = () => {

    let userData = {
      MobileNumber: this.state.mobileNumber.substring(3, 13),
      CountryCode: this.state.mobileNumber.substring(0, 3)
    }
    console.log(userData);
    axios.post('https://identitydev.elyments.in/api/Identity/GenerateOtp/V2', userData)
      .then(res => {
        console.log("res is", res);
        console.log(res.data);
        // useHistory().push('/otppage');
      })
      .catch(e => {
        console.log("error is", e)
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
          placeholder="Enter your phone number with country code"
          variant="outlined"
          className="title"
          type="text"
          inputMode="numeric"
          required={true}
          onChange={(value) => {
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

          <NavLink to={{
            pathname: "/otppage",
            mobileNumber: this.state.mobileNumber
          }} >
            <Button
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
            </Button>
          </NavLink>

        </div>
      </div>
    );
  }
}
