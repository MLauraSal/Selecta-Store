import { createContext, useState, useCallback } from "react";
import * as reviewService from "../services/reviewService";

const ReviewsContext = createContext();

export function ReviewsProvider({ children }) {
  const [reviews, setReviews] = useState({}); 
  const [loading, setLoading] = useState(false);

 
  const fetchReviewsForProduct = useCallback(async (productId) => {
    setLoading(true);
    const data = await reviewService.getReviewsByProduct(productId);
    setReviews((prev) => ({ ...prev, [productId]: data }));
    setLoading(false);
  }, []);

  
  const saveProductReview = async (productId, userId, reviewData, existingReviewId = null) => {
    let updatedReview;
    
    if (existingReviewId) {
      updatedReview = await reviewService.updateReview(existingReviewId, reviewData);
      setReviews((prev) => ({
        ...prev,
        [productId]: prev[productId].map((r) => (r.id === existingReviewId ? updatedReview : r)),
      }));
    } else {
      updatedReview = await reviewService.createReview({ ...reviewData, productId, userId });
      setReviews((prev) => ({
        ...prev,
        [productId]: [updatedReview, ...(prev[productId] || [])],
      }));
    }
    return updatedReview;
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        loading,
        fetchReviewsForProduct,
        saveProductReview,
        getAverageRanking: reviewService.getAverageRanking,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}
export default ReviewsContext;