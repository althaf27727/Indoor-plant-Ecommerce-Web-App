import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Header = () => {
  const Token = sessionStorage.getItem("Token");
  const Role = sessionStorage.getItem("Role");
  const navigate = useNavigate();
  console.log(Role);
  console.log(Token);
  const logout = () => {
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("Role");
    navigate("/");
    window.location.reload();
  };
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#FFFFFF" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <Button as={Link} to="/">
                <i>Home</i>
              </Button>
          <>
            <Button as={Link} to="/view-plant">
              {Role==1?(<i>EditPlants</i>):(<i>Plants</i>)}
            </Button>
            <Button as={Link} to="/view-mycart">
              <i>CART</i>
            </Button>

            <Button as={Link} to="/view-wishlist">
              <i>wishlist</i>
            </Button>
          </>

          {Token !== null ? (
            <Button as={Link} to="/" onClick={logout}>
              <i>Logout</i>
            </Button>
          ) : (
            <>
            
              <Button as={Link} to="/register">
                <i>Register</i>
              </Button>

              <Button as={Link} to="/login">
                <i>Login</i>
              </Button>

              <Button as={Link} to="/view-mycart">
                <i>CART</i>
              </Button>
              
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
