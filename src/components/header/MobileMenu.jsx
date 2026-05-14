import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MobileMenu({ open, onClose }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = [
          ...new Map(
            data.map((product) => [
              product.category.slug,
              product.category,
            ])
          ).values(),
        ];

        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error loading categories:", error));
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-primary text-text w-[85%] max-w-sm h-full p-5 overflow-y-auto transform transition border-r border-[#2A2A2A] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-accent font-bold tracking-[4px] uppercase text-sm">
            Menú
          </h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-[#2A2A2A] hover:bg-accent hover:text-primary transition"
          >
            ✕
          </button>
        </div>

        <nav className="mb-8">
          <h3 className="text-xs uppercase tracking-[4px] text-accent mb-4">
            Navigation
          </h3>

          <ul className="space-y-3">
            {[
              ["Home", "/"],
              ["Shop", "/products"],
              ["Cart", "/cart"],
              ["Blog", "/blog"],
              ["About", "/about"],
              ["Contact", "/contact"],
              ["Checkout", "/checkout"],
            ].map(([label, path]) => (
              <li key={label}>
                <Link
                  to={path}
                  onClick={onClose}
                  className="block py-3 border-b border-[#2A2A2A] hover:text-accent transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs uppercase tracking-[4px] text-accent mb-4">
          Categories
          </h3>

          <ul className="space-y-3">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/products?category=${category.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 py-3 border-b border-[#2A2A2A] hover:text-accent transition"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#2A2A2A]"
                  />

                  <span>{category.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}