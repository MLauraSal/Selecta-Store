import CartContext from "../contexts/CartContext.jsx";
import { useContext } from "react";


export const useCart = () => useContext(CartContext);