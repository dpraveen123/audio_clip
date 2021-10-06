import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
    Upload,
    Button,
  
  } from "antd";

export default class Login extends Component {
  render() {
    return (
      <div>
        <Typography
          sx={{ fontSize: 20, marginBottom: 3, color: "#8B139E" }}
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
        />
        <div style={{ alignItems: "center", textAlign: "center" }}>
          <Button
            // onClick={this.formValidations}
            variant="contained"
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
        </div>
      </div>
    );
  }
}
