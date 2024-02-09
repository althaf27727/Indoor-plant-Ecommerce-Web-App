import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const AddPlants = () => {
  const [data, setData] = useState({});
  const [file, setFile] = useState();

  const handlechange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
    console.log(data);
  };

  const handleSubmit = (event) => {
    const formData = new FormData();

    formData.append("plantname", data.plantname);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("image", file);

    event.preventDefault();
    axios
      .post("http://localhost:1010/api/plant/add-plant", formData)
      .then((response) => {
        console.log(response);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        
      });
  };

  return (
    <div>
      <div>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 400,
              height: 420,
              margin: "20px auto",
            },
          }}
        >
          <Paper elevation={3}>
            <form action="" onSubmit={handleSubmit}>
              <br />
              <center>
                <TextField
                  onChange={handlechange}
                  type="text"
                  name="plantname"
                  //   id="standard-basic"
                  label="Plant Name"
                  variant="standard"
                />
              </center>
              <br />
              <center>
                <TextField
                  onChange={handlechange}
                  type="text"
                  name="description"
                  //   id="standard-basic"
                  label="Description"
                  variant="standard"
                />
              </center>

              <br />
              <center>
                <TextField
                  onChange={handlechange}
                  type="text"
                  name="price"
                  //   id="standard-basic"
                  label="Price"
                  variant="standard"
                />
              </center>
              <br />
              <center>
                <TextField
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  name="image"
                  //   id="standard-basic"
                  label="Upload Image"
                  variant="standard"
                />
              </center>
              <br />

              <br />
              <center>
                <Button type="submit" id="button" variant="contained">
                  Add Plant
                </Button>
              </center>
            </form>
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default AddPlants;
