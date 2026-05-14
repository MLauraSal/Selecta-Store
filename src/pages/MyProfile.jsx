import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Swal from "sweetalert2";

export default function MyProfile() {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [preview, setPreview] = useState(
    user?.profilePic || user?.avatar || user?.photoURL || user?.image || ""
  );

  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    profilePic: user?.profilePic || "",
  });

  if (!user) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-primary to-[#1A1A1A] flex items-center justify-center px-4">
        <div className="bg-[#181818] border border-[#2A2A2A] rounded-[32px] p-8 text-center">
          <h2 className="text-text text-3xl font-black mb-4">
          You are not logged in
          </h2>

          <button
            onClick={() => navigate("/login")}
            className="bg-accent text-primary font-bold px-8 py-3 rounded-2xl"
          >
            Go to login
          </button>
        </div>
      </section>
    );
  }

  const handleChange = (e) => {
    const { id, value, files } = e.target;

    if (id === "profilePic") {
      const file = files[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);

        setPreview(imageUrl);
        setFormData({
          ...formData,
          profilePic: imageUrl,
        });
      }
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser(formData);

    Swal.fire({
      icon: "success",
      title: "Updated profile",
      text: "Tus datos se guardaron correctamente.",
      timer: 1500,
      showConfirmButton: false,
      background: "#111111",
      color: "#FFFFFF",
      confirmButtonColor: "#C8A96A",
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-primary to-[#1A1A1A] px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-accent uppercase tracking-[5px] text-xs mb-3">
            My Account
          </p>

          <h1 className="text-4xl lg:text-5xl font-black text-text">
          My profile
          </h1>

          <p className="text-gray-400 mt-4">
          Edit your personal information and profile picture.
          </p>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          <div className="bg-[#181818] border border-[#2A2A2A] rounded-[32px] p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
            <div className="w-36 h-36 rounded-full overflow-hidden mx-auto border-4 border-accent bg-primary flex items-center justify-center text-accent text-5xl font-black">
              {preview ? (
                <img
                  src={preview}
                  alt={formData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                formData.name.charAt(0).toUpperCase()
              )}
            </div>

            <h2 className="text-text text-2xl font-black mt-6">
              {formData.name || "User"}
            </h2>

            <p className="text-gray-400 mt-2">
              {formData.email || "No email"}
            </p>

            <span className="inline-block mt-5 bg-accent/10 text-accent border border-accent/30 px-4 py-2 rounded-full text-xs uppercase tracking-[3px]">
              {user.role || "user"}
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-[#181818] border border-[#2A2A2A] rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.55)] space-y-5"
          >
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Name
              </label>

              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-primary border border-[#2A2A2A] rounded-2xl text-text placeholder:text-gray-500 focus:outline-none focus:border-accent transition"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                User
              </label>

              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-primary border border-[#2A2A2A] rounded-2xl text-text placeholder:text-gray-500 focus:outline-none focus:border-accent transition"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Email
              </label>

              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-primary border border-[#2A2A2A] rounded-2xl text-text placeholder:text-gray-500 focus:outline-none focus:border-accent transition"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-300">
              Profile Pic
              </label>

              <input
                id="profilePic"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-3 file:px-5 file:rounded-2xl file:border-0 file:text-sm file:font-bold file:bg-accent file:text-primary hover:file:shadow-[0_0_20px_rgba(200,169,106,0.35)]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-primary font-bold py-3 rounded-2xl hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(200,169,106,0.35)] transition-all"
            >
              Save changes
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}