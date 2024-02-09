import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import AddPlants from "./components/AddPlants/AddPlants";
import ViewPlants from "./components/ViewPlants/ViewPlants";
import MyCart from "./components/MyCart/MyCart";
import Header from "./components/Header/Header";
import Wishlist from "./components/Wishlist/Wishlist";
import Profile from "./components/Profile/Profile";
import EditPlant from "./components/EditPlant/EditPlant";
import Footer from "./components/Footer/Footer";
import CheckOut from "./components/CheckOut/CheckOut";

function App() {
  return (
    <>
    <BrowserRouter>
  <Header/>

    
    <Routes>


<Route path="/" element={<Home/>} />
<Route path="/register" element={<Register/>} />
<Route path="/login" element={<Login/>}/>
<Route path="/add-plant" element={<AddPlants/>}/>
<Route path="/view-plant" element={<ViewPlants/>}/>
<Route path="/view-mycart" element={<MyCart/>}/>
<Route path="/view-wishlist" element={<Wishlist/>}/>
<Route path="/profile" element={<Profile/>}/>
<Route path="/edit-plant/:id" element={<EditPlant/>}/>
<Route path="/checkout" element={<CheckOut/>}/>


    </Routes>
    <Footer />

    </BrowserRouter>
    
    
    
    
    </>
  );
}

export default App;
