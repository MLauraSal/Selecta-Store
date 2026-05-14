import ProductContext from "../contexts/AuthContext"
import { useContext } from "react";

export const useProducts = () => useContext(ProductContext);
  


 export default useProducts