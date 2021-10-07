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

// var location = useLocation();
export default class OtpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            mobileNumber: '',
            countryCode: '',
            otpVerified: 0

        }
    }
    componentDidMount = () => {
        // const { mobilenumber } = this.props.location.state
        // console.log("props in otppage", mobilenumber);
        // console.log(location);
    }
    submitOtp = () => {
        let userData = {
            CountryCode: this.state.countryCode,
            Otp: this.state.otp,
            DeviceToken: "xyz",
            MobileNumber: this.state.mobileNumber
        }
        axios.post('https://identitydev.elyments.in/api/Identity/VerifyOtp/V2', userData)
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.setState({ otpVerified: 1 })
            })
    }
    render() {
        return (
            <div className='login-form'>
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
                    disabled
                    required={true}
                />
                <TextField
                    id="outlined-basic"
                    label="Enter OTP"
                    variant="outlined"
                    className="title"
                    required={true}
                    style={{ marginTop: 30 }}
                />
                {/* <p style={{ fontSize: 12, color: "red" }}> {this.state.otpVerified === 1 ? "Please fill out this field." : ""}</p> */}
                <div style={{ alignItems: "center", textAlign: "center" }}>
                    <Link to="/home"><Button
                        onClick={this.submitOtp}
                        variant="contained"
                        style={{
                            marginTop: 35,
                            textAlign: "center",
                            backgroundColor: "#8B139E",
                            color: "white",
                            borderRadius: 5,
                        }}
                    >
                        Submit OTP
                    </Button></Link>
                </div>
            </div>
        );
    }
}
