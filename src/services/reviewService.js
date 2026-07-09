import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../config/firebaseConfig";

const reviewsCollection = collection(db, "reviews");

export const getAllReviews = async () => {
  try {
    const snapshot = await getDocs(reviewsCollection);
    const reviews = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
   
    return reviews.sort((a, b) => {
      const dateA = a.createdAt?.seconds || 0;
      const dateB = b.createdAt?.seconds || 0;
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error getting all reviews:", error);
    return [];
  }
};

export const getReviewsByProduct = async (productId) => {
  try {
   
    const q = query(
      reviewsCollection,
      where("productId", "==", productId)
    );

    const snapshot = await getDocs(q);

    const reviews = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

  
    return reviews.sort((a, b) => {
      const dateA = a.createdAt?.seconds || 0;
      const dateB = b.createdAt?.seconds || 0;
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error getting reviews:", error);
    return [];
  }
};

export const createReview = async (reviewData) => {
  try {
    const docRef = await addDoc(reviewsCollection, {
      ...reviewData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      id: docRef.id,
      ...reviewData,
      createdAt: { seconds: Math.floor(Date.now() / 1000) },
      updatedAt: { seconds: Math.floor(Date.now() / 1000) },
    };
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

export const updateReview = async (id, reviewData) => {
  try {
    const reviewRef = doc(db, "reviews", id);

    await updateDoc(reviewRef, {
      ...reviewData,
      updatedAt: serverTimestamp(),
    });

    return {
      id,
      ...reviewData,
      updatedAt: { seconds: Math.floor(Date.now() / 1000) },
    };
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

export const deleteReview = async (id) => {
  try {
    const reviewRef = doc(db, "reviews", id);
    await deleteDoc(reviewRef);
    return id;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

export const getUserReviewForProduct = async (productId, userId) => {
  try {
    const q = query(
      reviewsCollection,
      where("productId", "==", productId),
      where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;

    const reviewDoc = snapshot.docs[0];
    return {
      id: reviewDoc.id,
      ...reviewDoc.data(),
    };
  } catch (error) {
    console.error("Error getting user review:", error);
    return null;
  }
};

export const getAverageRanking = (reviews = []) => {
  if (reviews.length === 0) return 0;

  const total = reviews.reduce(
    (sum, review) => sum + Number(review.ranking || 0),
    0
  );

  return Number((total / reviews.length).toFixed(1));
};