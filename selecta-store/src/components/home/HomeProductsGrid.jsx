import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import ProductsGrid from "../shop/ProductsGrid.jsx";

export default function HomeProductsGrid() {
  const [products, setProducts] = useState([]);

  const [charging, setCharging] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Error loading products"
          );
        }

        return res.json();
      })
      .then((data) => {
        setProducts(data.slice(0, 3));
      })
      .catch((err) =>
        setError(err.message)
      )
      .finally(() =>
        setCharging(false)
      );
  }, []);

  if (charging) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-400">
          {error}
        </p>
      </div>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-accent uppercase tracking-[6px] text-sm">
            Trending
          </span>

          <h2 className="text-text text-4xl lg:text-5xl font-black mt-4">
            Featured Products
          </h2>

          <div className="w-24 h-[2px] bg-accent rounded-full mt-5"></div>
        </div>

        {/* GRID */}
        <ProductsGrid products={products} />

        {/* BUTTON */}
        <div className="flex justify-center mt-14">
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="
                border
                border-accent
                text-accent
                px-10
                py-4
                rounded-2xl
                font-semibold
                tracking-wide
                hover:bg-accent
                hover:text-primary
                transition-all
              "
            >
             See more
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}