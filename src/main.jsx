import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ProductsProvider } from "./contexts/ProductsContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { FavoritesProvider } from "./contexts/FavoritesContext.jsx";
import { CategoriesProvider } from "./contexts/CategoriesContext.jsx";
import { UsersProvider } from "./contexts/UsersContext.jsx";
import { ReviewsProvider } from "./contexts/ReviewsContext.jsx";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <UsersProvider>
      <ReviewsProvider>
      <ProductsProvider>
        <CategoriesProvider>
          
            <CartProvider>
              <FavoritesProvider>
                <App />
              </FavoritesProvider>
            </CartProvider>
         
        </CategoriesProvider>
      </ProductsProvider>
      </ReviewsProvider>
    </UsersProvider>
    </AuthProvider>
  </StrictMode>
);