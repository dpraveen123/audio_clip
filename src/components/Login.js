/*
================ LOGIN COMPONENT ================ 
This component contains the phone number input form and
generate OTP API call.
*/
import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { GENERATE_OTP } from "../config/endpoints";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import { withRouter } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: '',
      isDisabled: true
    }
  }
  componentDidMount = async () => {
    // Check for the token in local storage, if it is there, redirect the user to upload clip form page
    let token = localStorage.getItem('accessToken');
    if(token){
      this.props.history.replace('/home');
    }
  }

  sendOtp = () => {
    let userData = {
      MobileNumber: this.state.mobileNumber.substring(3, 13),
      CountryCode: this.state.mobileNumber.substring(0, 3)
    }
    //  API call to generate the OTP
    axios.post(GENERATE_OTP, userData)
      .then(res => {
        // console.log(res.data);
      })
      .catch(e => {
        console.log("error is", e)
        swal({
          title: "Oops! An Error has occured!",
          text: "Please try again...",
          icon: "warning",
          button: "Okay",
        });
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

export default withRouter(Login);