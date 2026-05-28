import { createContext, useEffect, useState } from "react";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      setCategoriesError(error.message);
      console.error("Error loading categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        setCategoriesError(error.message);
        console.error("Error loading categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const addCategory = async (categoryData) => {
    const newCategory = await createCategory(categoryData);
    setCategories((prev) => [...prev, newCategory]);
  };

  const editCategory = async (id, categoryData) => {
    const updatedCategory = await updateCategory(id, categoryData);

    setCategories((prev) =>
      prev.map((category) =>
        category.id === id ? updatedCategory : category
      )
    );
  };

  const removeCategory = async (id) => {
    await deleteCategory(id);

    setCategories((prev) =>
      prev.filter((category) => category.id !== id)
    );
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