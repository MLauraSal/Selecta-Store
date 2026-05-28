import { useContext } from "react";
import CategoriesContext from "../contexts/CategoriesContext";

export const useCategory = () => {
  return useContext(CategoriesContext);
};

export default useCategory;