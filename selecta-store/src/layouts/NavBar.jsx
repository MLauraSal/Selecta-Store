import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";

import { useCart } from "../hooks/useCart.js";
import AuthContext from "../contexts/AuthContext.jsx";

import MobileMenu from "../components/header/MobileMenu.jsx";
import AccountMenu from "../components/header/AccountMenu.jsx";

import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -6,
    top: 1,
    border: `1px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function NavBar({ toggleCart }) {
  const { cartItems } = useCart();
  const { user, logout } = useContext(AuthContext);
  const [openMobile, setOpenMobile] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("category");

  const isActive = (path) => location.pathname === path;

  const navClass = (active) =>
    `
      relative
      inline-flex
      items-center
      h-10
      px-2
      transition
      duration-300
      hover:text-accent
      whitespace-nowrap
      ${
        active
          ? "text-accent after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-accent"
          : "text-white"
      }
    `;

  return (
    <>
      <nav className="flex items-center justify-between bg-primary text-text text-sm font-medium relative border-b border-accent/10">
        <div className="container flex justify-between px-4 py-3 mx-auto">
          <button
            className="md:hidden text-white hover:text-accent transition"
            onClick={() => setOpenMobile(true)}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>

          <div className="col-1 w-full px-6 items-center justify-center hidden md:flex">
            <ul className="flex items-center gap-4 text-[16px] text-text">
              <li>
                <Link to="/" className={navClass(isActive("/"))}>
                  Home
                </Link>
              </li>

              <li className="group relative">
                <Link
                  to="/products"
                  className={navClass(
                    location.pathname === "/products" && selectedCategory
                  )}
                >
                  Categories
                </Link>

                <div className="absolute left-[200%] -translate-x-1/2 top-full mt-6 bg-primary shadow-[0_20px_60px_rgba(0,0,0,0.55)] border border-[#2A2A2A] rounded-[28px] p-6 grid grid-cols-3 gap-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20 min-w-[700px]">
                  <ul className="space-y-2">
                    <li className="font-bold border-b border-accent mb-4 pb-2 text-accent uppercase tracking-[2px] text-xs">
                      Clothes
                    </li>

                    {["Clothes", "Accessories", "Shoes"].map(
                      (item) => (
                        <li key={item}>
                          <Link
                            to={`/products?category=${item.toLowerCase()}`}
                            className="text-gray-400 hover:text-accent transition"
                          >
                            {item}
                          </Link>
                        </li>
                      )
                    )}

                    <li className="mt-4">
                      <img
                        src="/img/stocksnap-dress-2583113_1920.jpg"
                        alt="Clothes"
                        className="w-full h-[170px] object-cover rounded-2xl border border-[#2A2A2A]"
                      />
                    </li>
                  </ul>

                  <ul className="space-y-2">
                    <li className="font-bold border-b border-accent mb-4 pb-2 text-accent uppercase tracking-[2px] text-xs">
                      Furniture
                    </li>

                    {["Living", "Bedroom", "Kitchen", "Bathroom"].map((item) => (
                      <li key={item}>
                        <Link
                          to={`/products?category=${item.toLowerCase()}`}
                          className="text-gray-400 hover:text-accent transition"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}

                    <li className="mt-4">
                      <img
                        src="/img/monoar_cgi_artist-room-1336497_1920.jpg"
                        alt="Furniture"
                        className="w-full h-[170px] object-cover rounded-2xl border border-[#2A2A2A]"
                      />
                    </li>
                  </ul>

                  <ul className="space-y-2">
                    <li className="font-bold border-b border-accent mb-4 pb-2 text-accent uppercase tracking-[2px] text-xs">
                      Technology
                    </li>

                    {["Notebooks", "Tv", "Phones", "Headphones", "Tablets"].map(
                      (item) => (
                        <li key={item}>
                          <Link
                            to={`/products?category=${item.toLowerCase()}`}
                            className="text-gray-400 hover:text-accent transition"
                          >
                            {item}
                          </Link>
                        </li>
                      )
                    )}

                    <li className="mt-6">
                      <img
                        src="/img/banners/joshuaworoniecki-laptop-5673901.jpg"
                        alt="Technology"
                        className="w-full h-[170px] object-cover rounded-2xl border border-[#2A2A2A]"
                      />
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <Link
                  to="/products"
                  className={navClass(
                    location.pathname === "/products" && !selectedCategory
                  )}
                >
                  Shopping
                </Link>
              </li>

              <li>
                <Link to="/cart" className={navClass(isActive("/cart"))}>
                  Cart
                </Link>
              </li>

              <li>
                <Link to="/blog" className={navClass(isActive("/blog"))}>
                  Blog
                </Link>
              </li>

              <li>
                <Link to="/about" className={navClass(isActive("/about"))}>
                  About
                </Link>
              </li>

              <li>
                <Link to="/contact" className={navClass(isActive("/contact"))}>
                  Contact
                </Link>
              </li>

              <li>
                <Link to="/checkout" className={navClass(isActive("/checkout"))}>
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-[40%] md:w-[25%] flex justify-end items-center gap-1">
            <IconButton id="cart-icon" aria-label="cart" onClick={toggleCart}>
              <StyledBadge
                badgeContent={cartItems?.length || 0}
                showZero
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#C8A96A",
                    color: "#111",
                    fontWeight: "bold",
                  },
                }}
              >
                <IoCartOutline className="w-6 h-6 text-white hover:text-accent transition" />
              </StyledBadge>
            </IconButton>

            <IconButton aria-label="heart">
              <StyledBadge
                badgeContent={0}
                showZero
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#C8A96A",
                    color: "#111",
                    fontWeight: "bold",
                  },
                }}
              >
                <FaRegHeart className="w-5 h-5 text-white hover:text-accent transition" />
              </StyledBadge>
            </IconButton>

            {user ? (
              <AccountMenu user={user} logout={logout} />
            ) : (
              <Link
                to="/login"
                className="ml-2 w-10 h-10 rounded-full border border-[#2A2A2A] bg-[#181818] flex items-center justify-center text-white hover:text-primary hover:bg-accent hover:border-accent transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0A17.933 17.933 0 0112 21.75a17.933 17.933 0 01-7.5-1.632z"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <MobileMenu open={openMobile} onClose={() => setOpenMobile(false)} />
    </>
  );
}