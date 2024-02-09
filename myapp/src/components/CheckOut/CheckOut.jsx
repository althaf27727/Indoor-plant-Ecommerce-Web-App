import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { CardActionArea, Container, Grid } from "@mui/material";


const CheckOut = () => {
  var Token = sessionStorage.getItem("Token");
  console.log(Token);

  const UserId = sessionStorage.getItem("UserId");
  console.log(UserId);

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:1010/api/mycart/view-mycart", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })

      .then((response) => {
        console.log(response);
        setData(response.data.data);
      });
  }, []);

  const subTotal = data.map((item) => {
    return item.price * item.quantity;
  });
  console.log(subTotal);

  const total = subTotal.reduce((total, item) => total + item, 0);
  console.log(total);
  return (
    <div>
      <Container maxWidth="lg">
        <center><h1 >CheckOut</h1></center>
        {" "}
                     <center><h1>TOTAL AMOUT TO BE PAID:{total}</h1>{" "}</center>   
        <Grid container spacing={5} style={{ marginTop: "20px" }}>
          {data.map((item, index) => (
            <>
              <Grid item xs={12} sm={4} ms={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="300"
                      src={`/images/${item.image}`}
                      alt="img"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                       Plantname: {item.plantname}{" "}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {item.quantity}
                        
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: {item.price}
                        
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Subtotal: {item.price * item.quantity}

                      </Typography>
                      
                    </CardContent>
                  </CardActionArea>
                  <CardActions></CardActions>
                </Card>
              </Grid>
              
            </>
          ))}
        </Grid>
      </Container>
<center><center>
                      
                      </center></center>
    </div>
  );
};

export default CheckOut;
