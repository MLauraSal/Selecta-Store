import ProductContext from "../contexts/ProductsContext"
import { useContext } from "react";

export const useProducts = () => useContext(ProductContext);
  


 export default useProducts