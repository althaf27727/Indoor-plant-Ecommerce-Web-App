import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { toast, Toaster } from "react-hot-toast";


const Register = () => {
  const [data, setData] = useState({});
  const handlechange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };
//   console.log(data);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:1010/api/register/user-registration", data)
      .then((response) => {
        console.log(response);
        setData(response.data.data);
          navigate('/login');
     
      
      toast.success("Registration Successful");
          setTimeout(() => {
            navigate("/login");
            window.location.reload();
          }, 3000);
        })
        .catch((error) => {
            toast.error(error.response.data.message);
          toast.error("Registration Failed");
  
          console.log(error);
        
        })
        
      

    
  };

  return (
    <div>
              <Toaster position="top-center" reverseOrder={false} />

      <Container>
      <Box
    
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 400,
            height: 555,
            margin: "20px auto",
            backgroundImage:"url('https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundRepeat:'no-repeat'
          },
        }}
      >
        <Paper className="paper"  elevation={3} >
            <form className="form" action="" onSubmit={handleSubmit}>
          <br />
          <br />
         <center><h1><i>Register!</i></h1></center>
       
            
          <center>
            <TextField
              onChange={handlechange}
              type="text"
              name="name"
            //   id="standard-basic"
              label="Name"
              variant="standard"
            />
          </center>
          <br />
          <center>
            <TextField
              onChange={handlechange}
              type="text"
              name="mobile"
            //   id="standard-basic"
              label="Mobile"
              variant="standard"
            />
          </center>

          <br />
          <center>
            <TextField
              onChange={handlechange}
              type="text"
              name="email"
            //   id="standard-basic"
              label="Email"
              variant="standard"
            />
          </center>
          <br />
          <center>
            <TextField
              onChange={handlechange}
              type="text"
              name="username"
            //   id="standard-basic"
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
            //   id="standard-basic"
              label="password"
              variant="standard"
            />
          </center>

          <br />
          <center>
          
            <Button  type="submit" id="button" variant="contained">
              Register
            </Button>
            <br />
            <p>Already registered? <Link to={`/login`}>
          Login
          </Link> </p>
          </center>
          </form>
        </Paper>
      </Box>
      </Container>
    </div>
  );
};

export default Register;
