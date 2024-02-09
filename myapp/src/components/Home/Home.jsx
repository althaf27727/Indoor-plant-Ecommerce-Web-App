import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { CardActionArea, Container, Grid } from "@mui/material";

const Home = () => {
  const Token = sessionStorage.getItem("Token");
  console.log(Token);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:1010/api/plant/view-plant").then((response) => {
      console.log(response);
      setData(response.data.data);
    });
  }, []);
  const addToMycart = (item) => {
    axios
      .post("http://localhost:1010/api/mycart/addmycart", item, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })

      .then((response) => {
        console.log(response);
        setData(response.data.data);
      });
  };

  const addToWishlist = (item) => {
    axios
      .post("http://localhost:1010/api/wishlist/add-wishlist", item, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })

      .then((response) => {
        console.log(response);
        setData(response.data.data);
      });
  };
  return (
    <div>
   

      <div className="parallaxone">
        <Container maxWidth="lg">
          <h1 style={{color:'white'}}>The Exclusive Leaf Products!</h1>
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
                        alt="plantimg"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.plantname}{" "}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                          <h3> INR:{item.price}/- </h3>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      {Token !== null ? (
                        <>
                          <Link to={`/view-wishlist`}>
                            <Button onClick={() => addToWishlist(item)}>
                              {" "}
                              Add to wishlist
                            </Button>
                          </Link>
                          <br />

                          <Link to={`/view-mycart`}>
                            <Tooltip title="Add to Cart">
                              <IconButton onClick={() => addToMycart(item)}>
                                {" "}
                                <AddShoppingCartIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                        </>
                      ) : (
                        ""
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              </>
            ))}
          </Grid>
        </Container>
      </div>
      <div className="parallaxone"></div>
    </div>
  );
};

export default Home;
