import { createContext, useState } from "react";

import {
  getReviewsByProduct,
  createReview,
  updateReview,
  deleteReview,
  getUserReviewForProduct,
  getAverageRanking,
} from "../services/reviewService";

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviewsError, setReviewsError] = useState(null);
  const [averageRanking, setAverageRanking] = useState(0);
  const [userReview, setUserReview] = useState(null);

const loadReviews = async (productId, userId = null) => {
  try {
    setLoadingReviews(true);
    setReviewsError(null);
  
    setUserReview(null); 

    const data = await getReviewsByProduct(productId);
    setReviews(data);
   
    setAverageRanking(getAverageRanking(data));

    if (userId) {
      const existingReview = await getUserReviewForProduct(productId, userId);
      setUserReview(existingReview);
    }
  } catch (error) {
    setReviewsError(error.message);
    console.error("Error loading reviews:", error);
  } finally {
    setLoadingReviews(false);
  }
};

  const addReview = async (reviewData) => {
    const existingReview = await getUserReviewForProduct(
      reviewData.productId,
      reviewData.userId
    );

    if (existingReview) {
      throw new Error("You have already reviewed this product.");
    }

    const newReview = await createReview(reviewData);

    setReviews((prev) => {
      const updated = [newReview, ...prev];
      setAverageRanking(getAverageRanking(updated));
      return updated;
    });

    setUserReview(newReview);

    return newReview;
  };

  const editReview = async (id, reviewData) => {
    const updatedReview = await updateReview(id, reviewData);

    setReviews((prev) => {
      const updated = prev.map((review) =>
        review.id === id ? { ...review, ...updatedReview } : review
      );

      setAverageRanking(getAverageRanking(updated));
      return updated;
    });

    setUserReview((prev) =>
      prev?.id === id ? { ...prev, ...updatedReview } : prev
    );

    return updatedReview;
  };

  const removeReview = async (id) => {
    await deleteReview(id);

    setReviews((prev) => {
      const updated = prev.filter((review) => review.id !== id);
      setAverageRanking(getAverageRanking(updated));
      return updated;
    });

    setUserReview((prev) => (prev?.id === id ? null : prev));
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        loadingReviews,
        reviewsError,
        averageRanking,
        userReview,
        loadReviews,
        addReview,
        editReview,
        removeReview,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};

export default ReviewsContext;