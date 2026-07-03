
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getProductImage } from "../utils/getProductImage";

export default function CartPage() {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  return (
    <section className="min-h-screen bg-gradient-to-b from-primary to-[#1A1A1A] px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-accent uppercase tracking-[5px] text-xs mb-3">
            Shopping Cart
          </p>

          <h1 className="text-4xl lg:text-5xl font-black text-text">
            Your Cart
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-[#181818] border border-[#2A2A2A] rounded-[32px] p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
            <p className="text-gray-400 mb-6">Your cart is empty.</p>

            <Link
              to="/products"
              className="inline-block border border-accent text-accent px-8 py-3 rounded-2xl hover:bg-accent hover:text-primary transition-all"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-5 mb-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-5 items-center bg-[#181818] border border-[#2A2A2A] rounded-[28px] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.45)] hover:border-accent transition"
                >
                  <img
                    src={getProductImage(item)}
                    alt={item.name}
                    loading="lazy"
                    className="w-28 h-28 object-cover border border-[#2A2A2A] rounded-2xl"
                  />

                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="font-bold text-xl text-text">{item.name}</h2>

                    <p className="text-sm text-gray-400 mt-1">
                      Unit price: ${item.price}
                    </p>

                    <div className="flex items-center justify-center sm:justify-start mt-4 gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-9 h-9 rounded-full border border-[#2A2A2A] text-text hover:bg-accent hover:text-primary transition"
                      >
                        −
                      </button>

                      <span className="text-text font-bold">{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-9 h-9 rounded-full border border-[#2A2A2A] text-text hover:bg-accent hover:text-primary transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center sm:items-end gap-3">
                    <p className="text-2xl font-black text-accent">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <IconButton
                      onClick={() => removeFromCart(item.id)}
                      sx={{
                        color: "#ff6b6b",
                        border: "1px solid #2A2A2A",
                        "&:hover": {
                          backgroundColor: "rgba(255,107,107,0.12)",
                        },
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#181818] border border-[#2A2A2A] rounded-[32px] p-6 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
              <div>
                <p className="text-gray-400 text-sm">Total</p>
                <p className="text-4xl font-black text-accent">
                  ${cartTotal.toFixed(2)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  to="/products"
                  className="text-center border border-accent text-accent px-8 py-3 rounded-2xl hover:bg-accent hover:text-primary transition-all"
                >
                  Continue shopping
                </Link>

                <Link
                  to="/checkout"
                  className="text-center bg-accent text-primary font-bold px-8 py-3 rounded-2xl hover:shadow-[0_0_30px_rgba(200,169,106,0.35)] transition-all"
                >
                  Complete purchase
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}