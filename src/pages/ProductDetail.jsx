import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { IoStar, IoStarOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";

import { useCart } from "../hooks/useCart";
import { useFlyToCart } from "../hooks/useFlyToCart";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [charging, setCharging] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const imageRef = useRef(null);

  const { addToCart } = useCart();
  const { animateToCart } = useFlyToCart();

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error loading product");
        }
        return res.json();
      })
      .then((data) => {
        const foundProduct = data.find(
          (item) => String(item.id) === String(id)
        );

        if (!foundProduct) {
          throw new Error("Product not found");
        }

        setProduct(foundProduct);
        setSelectedImage(foundProduct.image[0]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setCharging(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    animateToCart(imageRef.current);
  };

  if (charging) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-primary">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
          <p className="text-text tracking-wide">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-primary px-4 text-center">
        <p className="text-red-400 text-xl mb-6">{error}</p>

        <Link
          to="/products"
          className="border border-accent text-accent px-8 py-3 rounded-2xl hover:bg-accent hover:text-primary transition"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-primary to-[#1A1A1A] min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-accent hover:text-text transition mb-10"
        >
          <HiArrowLeft />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* IMAGES */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div className="bg-[#181818] border border-[#2A2A2A] rounded-[36px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
              <img
                ref={imageRef}
                src={selectedImage}
                alt={product.name}
                className="w-full h-[420px] sm:h-[620px] object-cover"
              />
            </div>

            {product.image?.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.image.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`rounded-2xl overflow-hidden border transition ${
                      selectedImage === img
                        ? "border-accent"
                        : "border-[#2A2A2A]"
                    }`}
                  >
                    <img
                      src={img}
                      alt={product.name}
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

         
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#181818] border border-[#2A2A2A] rounded-[36px] p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
          >
            <p className="uppercase tracking-[5px] text-accent text-xs mb-4">
              {product.category?.name}
            </p>

            <h1 className="text-text text-4xl sm:text-5xl font-black leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-1 text-accent mt-6 text-xl">
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStarOutline />
              <span className="text-gray-400 text-sm ml-3">
                4.0 reviews
              </span>
            </div>

            <p className="text-accent text-5xl font-black mt-8">
              ${product.price}
            </p>

            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mt-8">
              {product.description}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="bg-black/40 border border-[#2A2A2A] rounded-2xl p-5">
                <p className="text-accent text-sm uppercase tracking-[3px]">
                Stock
                </p>
                <p className="text-text font-bold mt-2"> {product.stock > 0 ? "Stock" : "Not available"}</p>
              </div>

              <div className="bg-black/40 border border-[#2A2A2A] rounded-2xl p-5">
                <p className="text-accent text-sm uppercase tracking-[3px]">
                Shipment
                </p>
                <p className="text-text font-bold mt-2">Fast</p>
              </div>
            </div>

            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="mt-10 w-full bg-accent text-primary font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(200,169,106,0.35)] transition-all"
            >
              <FaShoppingCart />
              Add to cart
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}