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
  
  export const getAllProducts = async () => {
    try {
      const snapshot = await getDocs(productsCollection);
      return snapshot.docs.map((doc )=> ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting products:", error);
    }
  };
  
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
  
  export const createProduct = async (data) => {
    try {
      const productRef = await addDoc(productsCollection, data);
      return { id: productRef.id, ...data };
     } catch (error) {
      console.error("Error creating product:", error);
      
     }
  };
  
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
  
  export const deleteProduct = async (id) => {
    try {
      const productRef = doc(productsCollection, id);
      const snapshot = await getDoc(productRef);
      if (!snapshot.exists()) return null;
  
  
      await deleteDoc(productRef);
      return { id: snapshot.id, ...snapshot.data() };
     } catch (error) {
      console.error("Error deleting product:", error);
      
     }
  };