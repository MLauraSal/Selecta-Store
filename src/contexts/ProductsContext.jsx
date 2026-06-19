import { createContext, useEffect, useState } from "react";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

const ProductContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const cachedProducts = sessionStorage.getItem("products");
    return cachedProducts ? JSON.parse(cachedProducts) : [];
  });

  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem("products");
  });

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getAllProducts();
      const safeData = data || [];

      setProducts(safeData);
      sessionStorage.setItem("products", JSON.stringify(safeData));
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
  }, []);

  const addProduct = async (productData) => {
    const newProduct = await createProduct(productData);

    if (!newProduct) return;

    setProducts((prev) => {
      const updated = [...prev, newProduct];
      sessionStorage.setItem("products", JSON.stringify(updated));
      return updated;
    });
  };

  const editProduct = async (id, updatedData) => {
    const updatedProduct = await updateProduct(id, updatedData);

    if (!updatedProduct) return;

    setProducts((prev) => {
      const updated = prev.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      );

      sessionStorage.setItem("products", JSON.stringify(updated));
      return updated;
    });
  };

  const removeProduct = async (id) => {
    await deleteProduct(id);

    setProducts((prev) => {
      const updated = prev.filter((product) => product.id !== id);
      sessionStorage.setItem("products", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        editProduct,
        removeProduct,
        refreshProducts: loadProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;