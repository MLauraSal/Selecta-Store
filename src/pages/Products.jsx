import { useEffect, useState } from "react";
import useProducts from "../hooks/useProducts";
import { useSearchParams, Link } from "react-router-dom";
import ProductsGrid from "../components/shop/ProductsGrid";

const PRODUCTS_PER_PAGE = 8;

const slugify = (text = "") =>
  String(text)
    .toLowerCase()
    .trim()
    .replaceAll(" ", "-");

export default function Products() {
  const { products = [], loading } = useProducts();

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const selectedSubcategory = searchParams.get("subcategory");

  const [currentPage, setCurrentPage] = useState(1);

  const getCategorySlug = (product) => {
    if (typeof product.category === "object") {
      return product.category?.slug || slugify(product.category?.name);
    }

    return slugify(product.category);
  };

  const getSubcategorySlug = (product) => {
    return slugify(product.subcategory);
  };

  const filteredProducts = products.filter((product) => {
    const matchCategory = selectedCategory
      ? getCategorySlug(product) === selectedCategory
      : true;

    const matchSubcategory = selectedSubcategory
      ? getSubcategorySlug(product) === selectedSubcategory
      : true;

    return matchCategory && matchSubcategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSubcategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-primary">
        <div className="w-14 h-14 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-primary to-[#1A1A1A] min-h-screen py-10 sm:py-14 px-3 sm:px-5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="uppercase tracking-[6px] text-xs sm:text-sm text-accent mb-3 font-medium">
            Selecta Store Collection
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text">
            {selectedCategory || selectedSubcategory
              ? "Filtered Products"
              : "Trending Products"}
          </h2>

          {(selectedCategory || selectedSubcategory) && (
            <Link to="/products" className="mt-4 text-accent hover:underline">
              View all products
            </Link>
          )}

          <div className="w-28 h-[2px] bg-accent rounded-full mt-5"></div>
        </div>

        {paginatedProducts.length > 0 ? (
          <>
            <ProductsGrid products={paginatedProducts} />

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-12 flex-wrap">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="px-5 py-3 rounded-2xl border border-[#2A2A2A] text-text disabled:opacity-40 disabled:cursor-not-allowed hover:border-accent hover:text-accent transition"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-11 h-11 rounded-2xl border transition ${
                      currentPage === index + 1
                        ? "bg-accent text-primary border-accent"
                        : "border-[#2A2A2A] text-text hover:border-accent hover:text-accent"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-5 py-3 rounded-2xl border border-[#2A2A2A] text-text disabled:opacity-40 disabled:cursor-not-allowed hover:border-accent hover:text-accent transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-400 py-20">
            There are no products in this category.
          </div>
        )}
      </div>
    </section>
  );
}