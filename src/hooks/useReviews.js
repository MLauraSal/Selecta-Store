import { useContext } from "react";
import ReviewsContext from "../contexts/ReviewsContext";

export const useReviews = () => {
  return useContext(ReviewsContext);
};

export default useReviews;