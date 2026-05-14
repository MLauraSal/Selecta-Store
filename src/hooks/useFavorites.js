import { useContext } from "react";
import FavoritesContext from "../contexts/FavoritesContext";

export const useFavorites = () => {
  return useContext(FavoritesContext);
};