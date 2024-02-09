import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { Link, useNavigate } from 'react-router-dom';



const Wishlist = () => {
    const Token = sessionStorage.getItem("Token");
    console.log(Token);
  
    const [data, setData] = useState([]);

    
    useEffect(() => {
    if(Token!==null){

      axios
        .get("http://localhost:1010/api/wishlist/view-wishlist", {
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
      axios.delete(`http://localhost:1010/api/wishlist/delete-wishlist/${id}`);
      window.location.reload();
      window.location.reload();
      navigate("/view-wishlist")
    };
  return (
    <div>

      {Token!==null?(
        <>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center',  paddingTop:'20px' }}>
          {data.length>0 ? (
      <>
 {data.map((item) => (
         <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="img"
        height="140"
        src={`/images/${item.image}`} 
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {item.plantname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {item.description}
        </Typography>
        <h2 variant="body2" color="text.secondary">
         INR:{item.price}/-
        </h2>
      </CardContent>
      <CardActions>

      <Tooltip title="Delete from wishlist">

<Button  onClick={() => handleDelete(item._id)} type='submit' >


 <p>Delete from wishlist</p>
  
</Button>
</Tooltip>

      </CardActions>

     
    </Card>
 ))}
    </>
    ) : (
      <h1>no items in wishlist.</h1>
    )}
 </div>
        </>
      ):(
<>
<div>
  <center>

          <Typography>Please login or register to view your cart.</Typography>
          <p>
            {" "}
            <Link to={`/register`}> Click here!</Link>{" "}
          </p>
  </center>
        </div>

</>

      )}
  
    </div>
  )
}

export default Wishlist