import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { getProductImage } from "../utils/getProductImage";

export default function Checkout() {
  const { cartItems, cartTotal } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Purchase completed successfully");
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-primary to-[#1A1A1A] px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-accent uppercase tracking-[5px] text-xs mb-3">
            Checkout
          </p>

          <h1 className="text-4xl lg:text-5xl font-black text-text">
            Complete purchase
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <form
            onSubmit={handleSubmit}
            className="bg-[#181818] border border-[#2A2A2A] rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.55)] space-y-5"
          >
            <h2 className="text-2xl font-bold text-text mb-4">
              Shipping information
            </h2>

            {[
              { name: "name", placeholder: "Full Name" },
              { name: "email", placeholder: "Email Address", type: "email" },
              { name: "address", placeholder: "Address" },
              { name: "phone", placeholder: "Phone Number" },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type || "text"}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-primary border border-[#2A2A2A] rounded-2xl text-text placeholder:text-gray-500 focus:outline-none focus:border-accent transition"
              />
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-primary border border-[#2A2A2A] rounded-2xl text-text placeholder:text-gray-500 focus:outline-none focus:border-accent transition"
              />

              <input
                type="text"
                name="zip"
                placeholder="Zip code"
                value={form.zip}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-primary border border-[#2A2A2A] rounded-2xl text-text placeholder:text-gray-500 focus:outline-none focus:border-accent transition"
              />
            </div>

            <button
              type="submit"
              disabled={cartItems.length === 0}
              className="w-full bg-accent text-primary font-bold py-3 rounded-2xl hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(200,169,106,0.35)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete purchase
            </button>
          </form>

          <div className="bg-[#181818] border border-[#2A2A2A] rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
            <h2 className="text-2xl font-bold text-text mb-6">
              Purchase summary
            </h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-400">Your cart is empty.</p>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-4 border-b border-[#2A2A2A] pb-4"
                  >
                    <img
                      src={getProductImage(item)}
                      alt={item.name}
                      loading="lazy"
                      className="w-16 h-16 rounded-xl object-cover border border-[#2A2A2A]"
                    />

                    <div className="flex-1">
                      <p className="text-text font-semibold line-clamp-1">
                        {item.name}
                      </p>

                      <p className="text-gray-400 text-sm">
                        Amount: {item.quantity}
                      </p>
                    </div>

                    <p className="text-accent font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex justify-between items-center border-t border-[#2A2A2A] pt-6">
              <span className="text-gray-400">Total</span>
              <span className="text-4xl font-black text-accent">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}