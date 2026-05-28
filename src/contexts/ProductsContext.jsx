import { createContext, useEffect, useState } from "react";
import { 
  getAllProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from "../services/productService";

const ProductContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // CREATE
  const addProduct = async (productData) => {
  
    const newProduct = await createProduct(productData);
    
   
    setProducts((prev) => [...prev, newProduct]);
  };

  // UPDATE
  const editProduct = async (id, updatedData) => {
    await updateProduct(id, updatedData); 
    
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updatedData } : product
      )
    );
  };

  // DELETE
  const removeProduct = async (id) => {
    await deleteProduct(id); 
    
    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <ProductContext.Provider value={{ 
      products,
      loading, 
      addProduct, 
      editProduct, 
      removeProduct,
      refreshProducts: loadProducts,
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContext;