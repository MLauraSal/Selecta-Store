import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    profilePic: null,
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;

    if (id === "profilePic") {
      const file = files[0];
      setFormData({ ...formData, profilePic: file });

      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await register({
        username: formData.username,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        profilePic: preview || "/img/user-default.jpg",
      });
  
      Swal.fire({
        icon: "success",
        title: "Successful registration",
        text: `Welcome, ${formData.name}!`,
        timer: 1500,
        showConfirmButton: false,
        background: "#111111",
        color: "#FFFFFF",
        confirmButtonColor: "#C8A96A",
      });
  
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration error",
        text: error.message,
        background: "#111111",
        color: "#FFFFFF",
        confirmButtonColor: "#C8A96A",
      });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-primary to-[#1A1A1A] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-[#181818] border border-[#2A2A2A] rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.55)] p-8">
        <div className="text-center mb-8">
          <p className="text-accent uppercase tracking-[5px] text-xs mb-3">
            Create Account
          </p>

          <h2 className="text-4xl font-black text-text">
            Register to Selecta Store
          </h2>

          <p className="text-sm text-gray-400 mt-4">
          Do you already have an account?{" "}
            <Link to="/login" className="text-accent hover:underline">
              Login
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-accent bg-primary overflow-hidden flex items-center justify-center text-accent font-bold">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                "Avatar"
              )}
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">
              User
            </label>

            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="User name"
              required
              className="w-full px-4 py-3 bg-primary border border-[#2A2A2A] rounded-2xl text-text placeholder:text-gray-500 focus:outline-none focus:border-accent transition"
            />
          </div>

          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">
             Name
            </label>

            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              className="w-full px-4 py-3 bg-primary border border-[#2A2A2A] rounded-2xl text-text placeholder:text-gray-500 focus:outline-none focus:border-accent transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
              Email
            </label>

            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              required
              className="w-full px-4 py-3 bg-primary border border-[#2A2A2A] rounded-2xl text-text placeholder:text-gray-500 focus:outline-none focus:border-accent transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>

            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Secure password"
              required
              className="w-full px-4 py-3 bg-primary border border-[#2A2A2A] rounded-2xl text-text placeholder:text-gray-500 focus:outline-none focus:border-accent transition"
            />
          </div>

          <div>
            <label htmlFor="profilePic" className="block mb-2 text-sm font-medium text-gray-300">
            Profile picture
            </label>

            <input
              type="file"
              id="profilePic"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-3 file:px-5 file:rounded-2xl file:border-0 file:text-sm file:font-bold file:bg-accent file:text-primary hover:file:shadow-[0_0_20px_rgba(200,169,106,0.35)]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-primary font-bold py-3 rounded-2xl hover:shadow-[0_0_30px_rgba(200,169,106,0.35)] hover:scale-[1.02] transition-all"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;