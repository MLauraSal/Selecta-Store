import RankingStars from "./RankingStars";
import { useReviews } from "../../hooks/useReviews";
import { useAuth } from "../../hooks/useAuth";

export default function ReviewsList() {
  const { user } = useAuth();
  const { reviews, loadingReviews, removeReview } = useReviews();

 if (loadingReviews) {
  return (
    <div className="bg-[#181818] border border-[#2A2A2A] rounded-[28px] p-6 text-center min-h-[120px] flex items-center justify-center">
      <p className="text-gray-400">
        Loading reviews...
      </p>
    </div>
  );
}

  if (reviews.length === 0) {
    return (
      <div className="bg-[#181818] border border-[#2A2A2A] rounded-[28px] p-6 text-center">
        <p className="text-gray-400">
          This product has no reviews yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {reviews.map((review) => {
        const canDelete =
          user?.uid === review.userId || user?.role === "admin";

        return (
          <div
            key={review.id}
            className="bg-[#181818] border border-[#2A2A2A] rounded-[28px] p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-accent bg-primary flex items-center justify-center text-accent font-bold">
                  {review.userPhoto ? (
                    <img
                      src={review.userPhoto}
                      alt={review.userName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    review.userName?.charAt(0)?.toUpperCase() || "U"
                  )}
                </div>

                <div>
                  <p className="text-text font-bold">
                    {review.userName || "User"}
                  </p>

                 <RankingStars ranking={review.ranking} size={17} />
                </div>
              </div>

              {canDelete && (
                <button
                  onClick={() => removeReview(review.id)}
                  className="text-red-400 hover:text-red-300 text-sm transition"
                >
                  Delete
                </button>
              )}
            </div>

            <p className="text-gray-400 mt-5 leading-relaxed">
              {review.comment}
            </p>
          </div>
        );
      })}
    </div>
  );
}