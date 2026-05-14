
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useContext, useEffect } from "react";
import AuthContext from "./contexts/AuthContext.jsx";
import UserProtectedRoute from "./routes/UserProtectedRoute.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import UserTable from "./components/dashboard/UserTable.jsx";
import ProductTable from "./components/dashboard/ProductTable.jsx";
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
import Dashboard from "./pages/DashBoard.jsx";
import Favorites from "./pages/Favorites";


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
            {/* públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog/>} />
            <Route path="/about" element={<About/>} />
            {/* protegidas solo para usuarios autenticados */}
            <Route path="/checkout" element={
              <UserProtectedRoute>
                <Checkout />
              </UserProtectedRoute>} />
            <Route path="/cart" element={
              <UserProtectedRoute>
                <CartPage />
              </UserProtectedRoute>} />
            <Route path="/profile" element={
              <UserProtectedRoute>
                <MyProfile />
              </UserProtectedRoute>} />

              <Route path="/favorites" element={
                <UserProtectedRoute>
                <Favorites />
                </UserProtectedRoute>} />

          </Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

          {/* protegida para admin */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard/users" element={<UserTable />} />
            <Route path="/dashboard/products" element={<ProductTable />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;