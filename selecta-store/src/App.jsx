import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useContext, useEffect } from "react";
import AuthContext from "./contexts/AuthContext.jsx";

import "./App.css";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Layouts from "./layouts/Layouts";
import Cart from "./components/cart/Cart";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register.jsx";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout.jsx";
import CartPage from "./pages/CartPage.jsx";
import Blog from "./pages/Blog.jsx";
import About from "./pages/About.jsx";
import MyProfile from "./pages/MyProfile.jsx";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const { verifyLog } = useContext(AuthContext);

useEffect(() => {
  verifyLog();
}, []);

  return (
    <Router>
      <div className="relative flex flex-col min-h-screen bg-primary">
        <Cart isOpen={isCartOpen} toggleCart={toggleCart} />

        <Routes>
          <Route element={<Layouts toggleCart={toggleCart} />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/blog" element={<Blog/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/profile" element={<MyProfile />} />
          </Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;