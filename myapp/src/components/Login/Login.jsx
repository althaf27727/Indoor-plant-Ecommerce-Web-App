import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { toast, Toaster } from "react-hot-toast";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Container, Grid, Typography } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState({});
  const handlechange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setItem({ ...item, [name]: value });
    console.log(item);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:1010/api/login/user-login", item)
      .then((response) => {
        console.log(response);
        console.log(response.data.userRole);
        sessionStorage.setItem("Role", response.data.userRole);
        sessionStorage.setItem("Token", response.data.token);
        sessionStorage.setItem("UserId", response.data.loginId);

        toast.success("Login Successful");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        toast.error("Login Failed");

        console.log(error);
      });
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      <div>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 300,
                height: 330,
                margin: "20px auto",
              },
            }}
          >
            <Paper className="paper" elevation={3}>
              <form action="" onSubmit={handleSubmit}>
                <br />
                <center>
                  <h1>
                    <i>Login!</i>
                  </h1>
                </center>
                <center>
                  <TextField
                    onChange={handlechange}
                    type="text"
                    name="username"
                    label="username"
                    variant="standard"
                  />
                </center>
                <br />
                <center>
                  <TextField
                    onChange={handlechange}
                    type="password"
                    name="password"
                    label="password"
                    variant="standard"
                  />
                </center>

                <br />
                <center>
                  <Button type="submit" id="button" variant="contained">
                    Login
                  </Button>
                  <br />
                  <p>
                    {" "}
                    Not yet registered? <Link to={`/register`}>
                      Register!{" "}
                    </Link>{" "}
                  </p>
                </center>
              </form>
            </Paper>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default Login;
