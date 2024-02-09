import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Tooltip from '@mui/material/Tooltip';
import { Container , Grid, CardActionArea} from '@mui/material';




const ViewPlants = () => {
    const Token = sessionStorage.getItem("Token");
    const Role = sessionStorage.getItem("Role")
    console.log(Token);
    const [data, setData] = useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:1010/api/plant/view-plant")
        .then((response) => {
          console.log(response);
          setData(response.data.data);
        });
    }, []);


    const addToMycart = (item) => {
        axios
        .post("http://localhost:1010/api/mycart/addmycart", item,{
          headers:{
            Authorization: `Bearer ${Token}`
          }
          
        })

        .then((response) => {
          console.log(response);
          setData(response.data.data);
         
      
        });
        
      }
      



  const addToWishlist = (item) => {
    axios
      .post("http://localhost:1010/api/wishlist/add-wishlist", item,{
        headers:{
            Authorization: `Bearer ${Token}`
        }
      })
      
      .then((response) => {
        console.log(response);
        setData(response.data.data);
      });
    };
    const navigate = useNavigate();
    const handleDelete = (id) => {
     axios.delete(`http://localhost:1010/api/plant/delete-plant/${id}`)
  
     navigate('/view-plant');
    };
  return (
    <div>
      


<Container maxWidth='lg'>
  <Typography>
The Exclusive Leaf Products!
  </Typography>
<Grid container spacing={5} style={{marginTop:'20px'}} >
{data.map((item,index) => (
  <>
  <Grid item xs={12} sm={4} ms={4} key={index}>
    <Card sx={{ maxWidth: 345 }} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          src={`/images/${item.image}`}
                    alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
{item.plantname}          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
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
                <Tooltip title="Add to Cart">
                <Link to={`/view-mycart`}>
                  <IconButton onClick={() => addToMycart(item)}>
                    {" "}
                    <AddShoppingCartIcon />
                    </IconButton>
                </Link>
                </Tooltip>
                <br />
{Role==1?(

  <>
 <Button onClick={() => handleDelete(item._id)} variant="primary" type="submit">
            Delete
          </Button>

                <Link to={`/edit-plant/${item._id}`}>
                <button>Edit</button>
                </Link>
                <br />
  </>

):(
  ''
)}
               
               
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
  )
}

export default ViewPlants