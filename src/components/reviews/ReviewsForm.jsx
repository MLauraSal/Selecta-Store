import { useAuth } from "../../hooks/useAuth";
import { useReviews } from "../../hooks/useReviews";
import ReviewFormContent from "./ReviewFormContent";

export default function ReviewForm({ productId }) {
  const { user } = useAuth();

  const {
    addReview,
    editReview,
    getUserReview,
  } = useReviews();

  if (!user) {
    return (
      <div className="bg-[#181818] border border-[#2A2A2A] rounded-[28px] p-6 text-center">
        <p className="text-gray-400">
          You must be logged in to leave a review.
        </p>
      </div>
    );
  }

  const userReview = getUserReview(productId, user.uid);

  return (
    <ReviewFormContent
      key={`${productId}-${user.uid}`}
      productId={productId}
      user={user}
      userReview={userReview}
      addReview={addReview}
      editReview={editReview}
    />
  );
}