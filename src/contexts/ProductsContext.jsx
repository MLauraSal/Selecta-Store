import { createContext, useEffect, useState } from "react";
import { 
  getAllProducts, 
  createProduct, 
  updateProductApi, 
  deleteProductApi 
} from "../services/api";

const ProductContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const loadData = async () => {
      const storedProducts = localStorage.getItem("app_products");
      
      if (storedProducts) {
        console.log("Loading from localStorage...");
        setProducts(JSON.parse(storedProducts));
      } else {
        console.log("Loading from JSON...");
        const data = await getAllProducts();
        setProducts(data);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  
  useEffect(() => {
    if (!loading && products.length > 0) {
      localStorage.setItem("app_products", JSON.stringify(products));
    }
  }, [products, loading]);

  // CREATE
  const addProduct = async (productData) => {
  
    const newProduct = await createProduct(productData);
    
   
    setProducts((prev) => [...prev, newProduct]);
  };

  // UPDATE
  const updateProduct = async (id, updatedData) => {
    await updateProductApi(id, updatedData); 
    
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updatedData } : product
      )
    );
  };

  // DELETE
  const deleteProduct = async (id) => {
    await deleteProductApi(id); 
    
    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <ProductContext.Provider value={{ 
      products, 
      addProduct, 
      updateProduct, 
      deleteProduct 
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContext;