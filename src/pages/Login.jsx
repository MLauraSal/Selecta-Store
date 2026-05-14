import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import Swal from "sweetalert2";
import { AccountCircle, Lock } from "@mui/icons-material";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = formData;

    let fakeUser = null;

    if (
      (username.toLowerCase() === "admin@ejemplo.com" || username === "admin") &&
      password === "admin1234"
    ) {
      fakeUser = {
        username,
        name: "Admin",
        email: "admin@ejemplo.com",
        profilePic: "/img/user-default.jpg",
        role: "admin",
      };
    } else if (username && password === "user1234") {
      fakeUser = {
        username,
        name: username,
        email: username.includes("@") ? username : "",
        profilePic: "/img/user-default.jpg",
        role: "user",
      };
    }

    if (fakeUser) {
      login(fakeUser);

      Swal.fire({
        icon: "success",
        title: "Welcome",
        text: `Hello, ${fakeUser.name}!`,
        timer: 1200,
        showConfirmButton: false,
        background: "#111111",
        color: "#FFFFFF",
        confirmButtonColor: "#C8A96A",
      }).then(() => {
        navigate(fakeUser.role === "admin" ? "/dashboard" : "/");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Incorrect credentials",
        text: "Please verify your username and password.",
        background: "#111111",
        color: "#FFFFFF",
        confirmButtonColor: "#C8A96A",
      });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-primary to-[#1A1A1A] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-[#181818] border border-[#2A2A2A] rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.55)] p-8">
        <div className="text-center mb-8">
          <p className="text-accent uppercase tracking-[5px] text-xs mb-3">
            Welcome Back
          </p>

          <h1 className="text-4xl font-black text-text">
          Login to Selecta Store
          </h1>

          <p className="text-sm mt-4 text-gray-400">
          Don't you have an account?{" "}
            <Link to="/register" className="text-accent hover:underline">
            Register
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">
              User
            </label>

            <div className="relative">
              <span className="absolute left-4 top-3 text-accent">
                <AccountCircle fontSize="small" />
              </span>

              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="username "
                required
                className="w-full pl-12 pr-4 py-3 bg-primary border border-[#2A2A2A] rounded-2xl text-text placeholder:text-gray-500 focus:outline-none focus:border-accent transition"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>

            <div className="relative">
              <span className="absolute left-4 top-3 text-accent">
                <Lock fontSize="small" />
              </span>

              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                required
                className="w-full pl-12 pr-4 py-3 bg-primary border border-[#2A2A2A] rounded-2xl text-text placeholder:text-gray-500 focus:outline-none focus:border-accent transition"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#C8A96A]" />
              <span>Remember me</span>
            </label>

            <Link to="#" className="text-accent hover:underline">
            Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-primary font-bold py-3 rounded-2xl hover:shadow-[0_0_30px_rgba(200,169,106,0.35)] hover:scale-[1.02] transition-all"
          >
           Login
          </button>
        </form>

      
      </div>
    </section>
  );
};

export default Login;