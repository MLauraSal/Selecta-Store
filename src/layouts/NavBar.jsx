import { Link, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { useCart } from "../hooks/useCart.js";
import AuthContext from "../contexts/AuthContext.jsx";
import { getAllCategories } from "../services/categoryService.js";

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

const slugify = (text) =>
  text.toLowerCase().trim().replaceAll(" ", "-");

export default function NavBar({ toggleCart }) {
  const { cartItems } = useCart();
  const { user, logout } = useContext(AuthContext);
  const { favorites } = useFavorites();

  const [openMobile, setOpenMobile] = useState(false);
  const [categories, setCategories] = useState([]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("category");
  const selectedSubcategory = params.get("subcategory");

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch((error) => console.error("Error loading categories:", error));
  }, []);

  const isActive = (path) => location.pathname === path;

  const navClass = (active) =>
    `
      relative inline-flex items-center h-10 px-2 transition duration-300
      hover:text-accent whitespace-nowrap
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

          <div className="w-full px-6 items-center justify-center hidden md:flex">
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
                    location.pathname === "/products" &&
                      (selectedCategory || selectedSubcategory)
                  )}
                >
                  Categories
                </Link>

                <div className="absolute left-1/2 -translate-x-1/4 top-full mt-6 bg-primary shadow-[0_20px_60px_rgba(0,0,0,0.55)] border border-[#2A2A2A] rounded-[28px] p-6 grid grid-cols-3 gap-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 min-w-[850px]">
                  {categories.map((category) => (
                    <div key={category.id} className="space-y-2">
                      <Link
                        to={`/products?category=${slugify(category.name)}`}
                        className="block font-bold border-b border-accent mb-4 pb-2 text-accent uppercase tracking-[2px] text-xs hover:text-text transition"
                      >
                        {category.name}
                      </Link>

                      {category.subcategory?.map((sub) => (
                        <Link
                          key={sub}
                          to={`/products?category=${slugify(
                            category.name
                          )}&subcategory=${slugify(sub)}`}
                          className="block text-gray-400 hover:text-accent transition"
                        >
                          {sub}
                        </Link>
                      ))}

                      {category.image && (
                        <Link to={`/products?category=${slugify(category.name)}`}>
                          <img
                            src={category.image}
                            alt={category.name}
                            className="mt-4 w-full h-[170px] object-cover rounded-2xl border border-[#2A2A2A]"
                          />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </li>

              <li>
                <Link
                  to="/products"
                  className={navClass(
                    location.pathname === "/products" &&
                      !selectedCategory &&
                      !selectedSubcategory
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
                <Link
                  to="/checkout"
                  className={navClass(isActive("/checkout"))}
                >
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

            <Link to="/favorites">
              <IconButton aria-label="heart">
                <StyledBadge
                  badgeContent={favorites?.length || 0}
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
            </Link>

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