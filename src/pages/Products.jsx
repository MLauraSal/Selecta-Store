import useProducts from "../hooks/useProducts";
import { useSearchParams, Link } from "react-router-dom";
import ProductsGrid from "../components/shop/ProductsGrid";

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

        {filteredProducts.length > 0 ? (
          <ProductsGrid products={filteredProducts} />
        ) : (
          <div className="text-center text-gray-400 py-20">
            There are no products in this category.
          </div>
        )}
      </div>
    </section>
  );
}