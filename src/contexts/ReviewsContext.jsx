import { createContext, useCallback, useState } from "react";

import {
  getReviewsByProduct,
  createReview,
  updateReview,
  deleteReview,
  getAverageRanking,
} from "../services/reviewService";

const ReviewsContext = createContext();

export function ReviewsProvider({ children }) {
  
  const [reviews, setReviews] = useState({});

  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviewsError, setReviewsError] = useState(null);



  const loadReviews = useCallback(async (productId) => {
    if (!productId) return;

   
    if (reviews[productId]) return;

    try {
      setLoadingReviews(true);
      setReviewsError(null);

      const data = await getReviewsByProduct(productId);

      setReviews((prev) => ({
        ...prev,
        [productId]: data,
      }));
    } catch (error) {
      console.error(error);
      setReviewsError(error.message);
    } finally {
      setLoadingReviews(false);
    }
  }, [reviews]);



  const getReviews = useCallback(
    (productId) => {
      return reviews[productId] || [];
    },
    [reviews]
  );



  const getAverage = useCallback(
    (productId) => {
      return getAverageRanking(getReviews(productId));
    },
    [getReviews]
  );



  const getUserReview = useCallback(
    (productId, userId) => {
      if (!userId) return null;

      return (
        getReviews(productId).find(
          (review) => review.userId === userId
        ) || null
      );
    },
    [getReviews]
  );

 

  const addReview = async (reviewData) => {
    const newReview = await createReview(reviewData);

    setReviews(prev => {
  const current = prev[reviewData.productId] || [];

  return {
    ...prev,
    [reviewData.productId]: [
      newReview,
      ...current.filter(r => r.id !== newReview.id),
    ],
  };
});
  };


  const editReview = async (id, reviewData) => {
    const updatedReview = await updateReview(id, reviewData);

    setReviews((prev) => {
      const current = prev[reviewData.productId] || [];

      return {
        ...prev,
        [reviewData.productId]: current.map((review) =>
          review.id === id ? updatedReview : review
        ),
      };
    });
  };

 

  const removeReview = async (id, productId) => {
    await deleteReview(id);

    setReviews(prev => {
      const current = prev[productId] || [];

      return {
        ...prev,
        [productId]: current.filter(
          review => review.id !== id
        ),
      };
    });
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,

        loadingReviews,
        reviewsError,

        loadReviews,

        getReviews,
        getAverage,
        getUserReview,

        addReview,
        editReview,
        removeReview,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}

export default ReviewsContext;