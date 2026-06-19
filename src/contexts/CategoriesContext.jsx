import { createContext, useEffect, useState } from "react";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => {
    const cachedCategories = sessionStorage.getItem("categories");
    return cachedCategories ? JSON.parse(cachedCategories) : [];
  });

  const [loadingCategories, setLoadingCategories] = useState(() => {
    return !sessionStorage.getItem("categories");
  });

  const [categoriesError, setCategoriesError] = useState(null);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);

      const data = await getAllCategories();
      const safeData = data || [];

      setCategories(safeData);
      sessionStorage.setItem("categories", JSON.stringify(safeData));
    } catch (error) {
      setCategoriesError(error.message);
      console.error("Error loading categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      loadCategories();
    }
  }, []);

  const addCategory = async (categoryData) => {
    const newCategory = await createCategory(categoryData);

    if (!newCategory) return;

    setCategories((prev) => {
      const updated = [...prev, newCategory];
      sessionStorage.setItem("categories", JSON.stringify(updated));
      return updated;
    });
  };

  const editCategory = async (id, categoryData) => {
    const updatedCategory = await updateCategory(id, categoryData);

    if (!updatedCategory) return;

    setCategories((prev) => {
      const updated = prev.map((category) =>
        category.id === id ? { ...category, ...updatedCategory } : category
      );

      sessionStorage.setItem("categories", JSON.stringify(updated));
      return updated;
    });
  };

  const removeCategory = async (id) => {
    await deleteCategory(id);

    setCategories((prev) => {
      const updated = prev.filter((category) => category.id !== id);
      sessionStorage.setItem("categories", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        loadingCategories,
        categoriesError,
        addCategory,
        editCategory,
        removeCategory,
        refreshCategories: loadCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContext;