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

const reviewsCollection = collection(db, "reviews");


export const getAllReviews = async () => {
    try {
      const snapshot = await getDocs(reviewsCollection);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting reviews:", error);
    }

    };

export const getReviewById = async (id) => {
    try {
      const reviewRef = doc(reviewsCollection, id);
      const snapshot = await getDoc(reviewRef);
      if (!snapshot.exists()) return null;
      return { id: snapshot.id, ...snapshot.data() };
    } catch (error) {
      console.error("Error getting review by ID:", error);
      return null;
    }
};
