import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductsGrid from "../shop/ProductsGrid.jsx";
import useProducts from "../../hooks/useProducts.js";

export default function HomeProductsGrid() {
  const { products = [], loading } = useProducts();

  const featuredProducts = products.slice(0, 3);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-accent uppercase tracking-[6px] text-sm">
            Trending
          </span>

          <h2 className="text-text text-4xl lg:text-5xl font-black mt-4">
            Featured Products
          </h2>

          <div className="w-24 h-[2px] bg-accent rounded-full mt-5"></div>
        </div>

        {featuredProducts.length > 0 ? (
          <ProductsGrid products={featuredProducts} />
        ) : (
          <p className="text-center text-gray-400">
            No products available.
          </p>
        )}

        <div className="flex justify-center mt-14">
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="border border-accent text-accent px-10 py-4 rounded-2xl font-semibold tracking-wide hover:bg-accent hover:text-primary transition-all"
            >
              See more
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}