import ProductContext from "../contexts/ProductsContext.jsx"
import { useContext } from "react";

export const useProducts = () => useContext(ProductContext);
  


 export default useProducts