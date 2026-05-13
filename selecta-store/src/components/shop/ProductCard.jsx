import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion } from "framer-motion";

import { useCart } from "../../hooks/useCart";
import { useFlyToCart } from "../../hooks/useFlyToCart";

import { BsSuitHeartFill } from "react-icons/bs";
import { HiOutlineEye } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import { IoStar, IoStarOutline } from "react-icons/io5";

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { animateToCart } = useFlyToCart();
  const imageRef = useRef(null);

  const productImage = Array.isArray(product.image)
    ? product.image[0]
    : product.image || product.images?.[0]?.src || "/img/no-image.png";

  const categoryName =
    product.category?.name || product.category || "Product";

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    animateToCart(imageRef.current);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative bg-[#181818] border border-[#2A2A2A] rounded-[28px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.45)] hover:border-accent hover:shadow-[0_0_30px_rgba(200,169,106,0.15)] transition-all duration-500"
    >
      <div className="relative overflow-hidden">
        <img
          ref={imageRef}
          src={productImage}
          alt={product.name}
          className="w-full h-[220px] sm:h-[320px] object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

        <div className="absolute top-4 left-4">
          <span className="bg-accent text-primary font-bold tracking-widest text-[10px] px-4 py-2 rounded-full shadow-lg">
            NEW
          </span>
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-3 translate-x-20 group-hover:translate-x-0 transition-all duration-500">
          <button className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/70 backdrop-blur-lg text-text flex justify-center items-center border border-[#2A2A2A] hover:bg-accent hover:text-primary transition">
            <BsSuitHeartFill size={15} />
          </button>

          <Link
            to={`/products/${product.id}`}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/70 backdrop-blur-lg text-text flex justify-center items-center border border-[#2A2A2A] hover:bg-accent hover:text-primary transition"
          >
            <HiOutlineEye size={18} />
          </Link>

          <button
            onClick={handleAddToCart}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/70 backdrop-blur-lg text-text flex justify-center items-center border border-[#2A2A2A] hover:bg-accent hover:text-primary transition"
          >
            <FaShoppingCart size={15} />
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <p className="uppercase tracking-[3px] text-[10px] sm:text-xs text-accent mb-2">
          {categoryName}
        </p>

        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm sm:text-xl font-bold text-text hover:text-accent transition line-clamp-2 min-h-[48px] sm:min-h-[60px]">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs sm:text-sm text-gray-400 mt-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center gap-1 text-accent mt-4">
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStarOutline />
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-2xl sm:text-3xl font-black text-accent">
            ${product.price}
          </p>

          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="bg-accent text-primary font-semibold text-sm sm:text-base px-5 py-3 rounded-2xl hover:shadow-[0_0_25px_rgba(200,169,106,0.35)] transition-all whitespace-nowrap"
          >
            Shop now
          </motion.button>
        </div>
      </div>

      <div className="absolute inset-0 rounded-[28px] border border-white/5 pointer-events-none"></div>
    </motion.div>
  );
}