import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
  } from "firebase/firestore";
  
  import { db } from "../config/firebaseConfig.js";
  
  const productsCollection = collection(db, "products");

  //Obtener todos los productos
  
  export const getAllProducts = async () => {
    try {
      const snapshot = await getDocs(productsCollection);
      return snapshot.docs.map((doc )=> ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting products:", error);
    }
  };
  //Obtener un producto por ID
  export const getProductById = async (id) => {
    try {
      const productRef = doc(productsCollection, id);
      const snapshot = await getDoc(productRef);
      if (!snapshot.exists()) return null;
      return { id: snapshot.id, ...snapshot.data() };
    } catch (error) {
      console.error("Error getting product by ID:", error);
      return null;
      
    }
  };
  //Crear un nuevo producto
  export const createProduct = async (data) => {
    try {
      const productRef = await addDoc(productsCollection, data);
      return { id: productRef.id, ...data };
     } catch (error) {
      console.error("Error creating product:", error);
      
     }
  };

  //Actualizar un producto por ID
  
  export const updateProduct = async (id, data) => {
    try {
      const productRef = doc(productsCollection, id);
      const snapshot = await getDoc(productRef);
      if (!snapshot.exists()) return null;
    
    
      await updateDoc(productRef, data);
      return { id: snapshot.id, ...snapshot.data(), ...data };
    
     } catch (error) {
        console.error("Error updating product:", error);
      
     }
  };
  //Eliminar un producto por ID
  export const deleteProduct = async (id) => {
    try {

      // Verificar si el producto existe antes de eliminarlo
      const productRef = doc(productsCollection, id);
      const snapshot = await getDoc(productRef);
      if (!snapshot.exists()) return null;
  
  
      await deleteDoc(productRef);
      return { id: snapshot.id, ...snapshot.data() };
     } catch (error) {
      console.error("Error deleting product:", error);
      
     }
  };