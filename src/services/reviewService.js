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



const mapReview = (docSnapshot) => ({
  id: docSnapshot.id,
  ...docSnapshot.data(),
});

const sortReviews = (reviews) => {
  return reviews.sort((a, b) => {
    const dateA = a.createdAt?.seconds || 0;
    const dateB = b.createdAt?.seconds || 0;

    return dateB - dateA;
  });
};



export const getAllReviews = async () => {
  try {
    const snapshot = await getDocs(reviewsCollection);

    return sortReviews(snapshot.docs.map(mapReview));
  } catch (error) {
    console.error("Error getting all reviews:", error);
    return [];
  }
};



export const getReviewsByProduct = async (productId) => {
  if (!productId) return [];

  try {
    const q = query(
      reviewsCollection,
      where("productId", "==", String(productId))
    );

    const snapshot = await getDocs(q);

    return sortReviews(snapshot.docs.map(mapReview));
  } catch (error) {
    console.error("Error getting reviews:", error);
    return [];
  }
};



export const getUserReviewForProduct = async (
  productId,
  userId
) => {
  if (!productId || !userId) return null;

  try {
    const q = query(
      reviewsCollection,
      where("productId", "==", String(productId)),
      where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    return mapReview(snapshot.docs[0]);
  } catch (error) {
    console.error("Error getting user review:", error);
    return null;
  }
};



export const createReview = async (reviewData) => {
  try {
    const data = {
      ...reviewData,
      productId: String(reviewData.productId),
      ranking: Number(reviewData.ranking),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(reviewsCollection, data);

    return {
      id: docRef.id,
      ...data,
      createdAt: {
        seconds: Math.floor(Date.now() / 1000),
      },
      updatedAt: {
        seconds: Math.floor(Date.now() / 1000),
      },
    };
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};



export const updateReview = async (id, reviewData) => {
  try {
    const reviewRef = doc(db, "reviews", id);

    const data = {
      ...reviewData,
      productId: String(reviewData.productId),
      ranking: Number(reviewData.ranking),
      updatedAt: serverTimestamp(),
    };

    await updateDoc(reviewRef, data);

    return {
      id,
      ...data,
      updatedAt: {
        seconds: Math.floor(Date.now() / 1000),
      },
    };
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};


export const deleteReview = async (id) => {
  try {
    await deleteDoc(doc(db, "reviews", id));

    return id;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};



export const getAverageRanking = (reviews = []) => {
  if (!reviews.length) return 0;

  const total = reviews.reduce(
    (sum, review) => sum + Number(review.ranking || 0),
    0
  );

  return Number((total / reviews.length).toFixed(1));
};



export const getReviewsCount = (reviews = []) => {
  return reviews.length;
};