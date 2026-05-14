import { Outlet } from "react-router-dom";

import Header from "./Header";

import Navbar from "./NavBar";
import Footer from "./Footer";




export default function Layouts({ toggleCart }) {

 
  return (
    <div className="layouts">
     <Header  />
    <Navbar toggleCart={toggleCart} />
    <Outlet />
    <Footer />
     
    </div>
  );
}