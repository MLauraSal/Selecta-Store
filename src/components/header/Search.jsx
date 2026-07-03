import { useState, useRef, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { getProductImage } from "../../utils/getProductImage";

export default function Search() {
  const { products = [] } = useProducts();
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const wrapperRef = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setFilteredProducts([]);
      return;
    }

    const results = products.filter((product) =>
      product.name?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProducts(results.slice(0, 6));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setFilteredProducts([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={handleSearch}
        className="w-full bg-transparent border border-gray-600 text-white px-4 py-2 rounded-full pr-10 focus:outline-none focus:border-[#C8A96A] transition"
      />

      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C8A96A] transition"
      >
        <IoSearch />
      </button>

      {filteredProducts.length > 0 && (
        <div className="absolute mt-2 w-full bg-[#181818] border border-[#2A2A2A] rounded-2xl shadow-lg z-50 max-h-72 overflow-y-auto">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="flex items-center p-3 hover:bg-white/5 transition border-b border-[#2A2A2A] last:border-none"
              onClick={() => {
                setFilteredProducts([]);
                setQuery("");
              }}
            >
              <img
                src={getProductImage(product)}
                alt={product.name}
                loading="lazy"
                className="w-11 h-11 object-cover rounded-xl mr-3 border border-[#2A2A2A]"
              />

              <span className="text-sm text-text">{product.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}