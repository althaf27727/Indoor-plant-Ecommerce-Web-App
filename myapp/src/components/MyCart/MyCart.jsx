import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container, Grid } from "@mui/material";

const MyCart = () => {
  var Token = sessionStorage.getItem("Token");
  console.log(Token);

  const UserId = sessionStorage.getItem("UserId");
  console.log(UserId);

  const [data, setData] = useState([]);
  useEffect(() => {
    if (Token !== null) {
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
    }
  }, []);

  const navigate = useNavigate();
  const handleDelete = (id) => {
    axios.delete(`http://localhost:1010/api/mycart/delete-cartitem/${id}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    window.location.reload();
    navigate("/view-mycart");
  };

  const increment = async (id, item) => {
    try {
      const updatedQuantity = item.quantity + 1;

      const response = await axios.post(
        `http://localhost:1010/api/mycart/increment/${id}/${UserId}`
      );

      console.log(response);
      const updatedProduct = data.map((product) =>
        product._id === id ? { ...product, quantity: updatedQuantity } : product
      );
      setData(updatedProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const decrement = async (id, item) => {
    try {
      const updatedQuantity = item.quantity - 1;

      const response = await axios.post(
        `http://localhost:1010/api/mycart/decrement/${id}/${UserId}`
      );

      console.log(response);
      const updatedProduct = data.map((product) =>
        product._id === id ? { ...product, quantity: updatedQuantity } : product
      );
      setData(updatedProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const subTotal = data.map((item) => {
    return item.price * item.quantity;
  });
  console.log(subTotal);

  const total = subTotal.reduce((total, item) => total + item, 0);
  console.log(total);

  return (
    <div style={{marginBottom:'200px'}}>
      {Token !== null ? (
        <>

{data.length>0 ? (
          <Container maxWidth="lg">
            <Typography> Your Cart!</Typography>
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
                          alt=""
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {item.plantname}{" "}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Typography> Quantity:{item.quantity}</Typography>
                        <Typography>
                          <button
                            onClick={() => increment(item._id, item)}
                            variant="contained"
                            size="small"
                          >
                            +
                          </button>

                          <button
                            style={{ marginLeft: "10px" }}
                            type="submit"
                            variant="contained"
                            size="small"
                            onClick={() => decrement(item._id, item)}
                          >
                            -{" "}
                          </button>
                        </Typography>

                        <br />

                        <br />
                      </CardActions>

                      <Typography>
                        <p style={{ marginTop: "10px" }}>
                          Subtotal: {item.price * item.quantity}
                        </p>

                        <center>
                          <Button
                            onClick={() => handleDelete(item._id)}
                            size="small"
                            variant="contained"
                            style={{ marginTop: "10px" }}
                          >
                            Delete{" "}
                          </Button>
                        </center>
                      </Typography>
                    </Card>
                  </Grid>
                </>
              ))}
            </Grid>
            <Link to={`/checkOut`}>
              <Button variant="contained" size="large" style={{marginLeft:500,marginTop:'30px'}}>
               Buy Now!</Button>
              </Link>{" "}
          </Container>
):(
  <center>

  <h1>no items in cart.</h1>
  </center>

)}
        </>
      ) : (
        <div>
          <center>

          <Typography>Please login or register to view your cart.</Typography>
          <p>
            {" "}
            <Link to={`/register`}> Click here!</Link>{" "}
          </p>
          </center>
        </div>
      )}
    </div>
  );
};

export default MyCart;
