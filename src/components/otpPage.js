import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { withRouter } from "react-router-dom";
import { VERIFY_OTP } from "../config/endpoints";
import { Button } from "antd";
import axios from "axios";

class OtpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            mobileNumber: '',
            countryCode: '',
            otpVerified: 1,
            accessToken: ''
        }
    }

    componentDidMount = () => {
        let token = localStorage.getItem('accessToken');
        if(token){
          this.props.history.replace('/home');
        }
        if (this.props.location.mobileNumber !== undefined) {
            this.setState({ mobileNumber: this.props.location.mobileNumber.substring(3, 13) })
            this.setState({ countryCode: this.props.location.mobileNumber.substring(0, 3) })
            // console.log(this.state.mobileNumber, this.state.countryCode, "is props in otppage");
        }
    }

    submitOtp = () => {
        let userData = {
            CountryCode: this.state.countryCode,
            Otp: this.state.otp,
            DeviceToken: "xyz",
            MobileNumber: this.state.mobileNumber
        }
        axios.post(VERIFY_OTP, userData)
            .then(res => {
                this.setState({ otpVerified: 1 })
                // console.log(res.data);
                // console.log("accesToken", res.data.accessToken);
                this.state.accessToken = res.data.accessToken
                this.setState({ accessToken: this.state.accessToken })
                localStorage.setItem('accessToken', this.state.accessToken)
                this.props.history.replace({ pathname: '/home', accessToken: this.state.accessToken })
            })
            .catch((e) => {
                this.setState({ otpVerified: 0 })

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
                    value={this.state.mobileNumber}
                />
                <TextField
                    id="outlined-basic"
                    label="Enter OTP"
                    variant="outlined"
                    className="title"
                    required={true}
                    style={{ marginTop: 30 }}
                    onChange={(value) => {
                        this.setState({ otp: value.target.value })
                    }}
                />
                <p style={{ fontSize: 12, color: "red", }}> {this.state.otpVerified === 0 ? "Invalid OTP" : ""}</p>

                <div style={{ alignItems: "center", textAlign: "center" }}>
                    <Button
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
                    </Button>

                </div>
            </div>
        );
    }
}
export default withRouter(OtpPage);