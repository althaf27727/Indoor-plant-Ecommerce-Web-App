import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { Box, Button, Paper, TextField } from '@mui/material';
const EditPlant = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);
  
  
    const [data, setData] = useState({});
    const [file, setFile] = useState();
  
  
  
    useEffect(() => {
      axios
        .get(`http://localhost:1010/api/plant/view-plant/${id}`)
        .then((response) => {
          console.log(response);
          setData(response.data.data);
        });
    },[id]);
  
    const handlechange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData({ ...data, [name]: value });
      console.log(data);
    };
  
    const handleSubmit = (event) => {
  
      const formData = new FormData();
   
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("image", file);
    for (const value of formData.values()) {
      console.log(value);
    }    
    
  
      event.preventDefault();
      axios
        .post(`http://localhost:1010/api/plant/update-plant/${id}`, formData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
       
    };
  return (
    <div> <div>
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
            <label style={{marginRight:'10px'}}>PlantName</label>
            <TextField
              onChange={handlechange}
              type="text"
              name="plantname"
              variant="standard"
              value={data.plantname}
            />
          </center>
          <br />
          <center>
          <label style={{marginRight:'10px'}}>Description</label>

            <TextField
              onChange={handlechange}
              type="text"
              name="description"
              variant="standard"
              value={data.description}

            />
          </center>

          <br />
          <center>
          <label style={{marginRight:'10px'}}>Price</label>

            <TextField
              onChange={handlechange}
              type="text"
              name="price"
              variant="standard"
              value={data.price}

            />
          </center>
          <br />
          <div> 
            <img style={{height:'100px'}} src={data.image} alt="" />
        </div>
          <center>

          <label style={{marginRight:'10px'}}>Upload Image</label>
            <TextField
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              name="image"
              variant="standard"
            />
          </center>
          <br />

          <br />
          <center>
            <Button type="submit" id="button" variant="contained">
              Update Plant
            </Button>
          </center>
        </form>
      </Paper>
    </Box>
  </div>
  </div>
  )
}

export default EditPlant