import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import ProductsGrid from "../components/shop/ProductsGrid";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <section className="min-h-screen bg-gradient-to-b from-primary to-[#1A1A1A] px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-accent uppercase tracking-[5px] text-xs mb-3">
            Wishlist
          </p>

          <h1 className="text-4xl lg:text-5xl font-black text-text">
            Mis favoritos
          </h1>

          <p className="text-gray-400 mt-4">
            Productos que guardaste para ver más tarde.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-[#181818] border border-[#2A2A2A] rounded-[32px] p-10 text-center">
            <p className="text-gray-400 mb-6">
              Todavía no agregaste productos a favoritos.
            </p>

            <Link
              to="/products"
              className="inline-block bg-accent text-primary font-bold px-8 py-3 rounded-2xl hover:scale-[1.03] transition-all"
            >
              View Products
            </Link>
          </div>
        ) : (
          <ProductsGrid products={favorites} />
        )}
      </div>
    </section>
  );
}