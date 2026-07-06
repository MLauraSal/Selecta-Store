import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useAuth } from "../../hooks/useAuth";
import { useReviews } from "../../hooks/useReviews";
import RankingStars from "./RankingStars";

export default function ReviewForm({ productId }) {
  const { user } = useAuth();
  const { addReview, editReview, userReview } = useReviews();

  const [ranking, setRanking] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userReview) {
      setRanking(userReview.ranking || 5);
      setComment(userReview.comment || "");
    } else {
      setRanking(5);
      setComment("");
    }
  }, [userReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return;
    if (!comment.trim()) return;

    try {
      setLoading(true);

      const reviewData = {
        productId,
        userId: user.uid,
        userName: user.name || user.username || "User",
        userPhoto: user.profilePic || "",
        ranking,
        comment: comment.trim(),
      };

      if (userReview) {
        await editReview(userReview.id, reviewData);
      } else {
        await addReview(reviewData);
      }

      Swal.fire({
        icon: "success",
        title: userReview ? "Review updated" : "Review published",
        timer: 1300,
        showConfirmButton: false,
        background: "#111111",
        color: "#FFFFFF",
        confirmButtonColor: "#C8A96A",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Review error",
        text: error.message,
        background: "#111111",
        color: "#FFFFFF",
        confirmButtonColor: "#C8A96A",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-[#181818] border border-[#2A2A2A] rounded-[28px] p-6 text-center">
        <p className="text-gray-400">
          You must be logged in to leave a review.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#181818] border border-[#2A2A2A] rounded-[28px] p-6 space-y-5"
    >
      <div>
        <p className="text-accent uppercase tracking-[4px] text-xs mb-3">
          Your review
        </p>

        <RankingStars
          ranking={ranking}
          interactive
          size={26}
          onChange={setRanking}
        />
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your opinion about this product..."
        rows={4}
        className="w-full bg-primary border border-[#2A2A2A] rounded-2xl text-text placeholder:text-gray-500 px-4 py-3 focus:outline-none focus:border-accent transition resize-none"
      />

      <button
        type="submit"
        disabled={loading || !comment.trim()}
        className="w-full bg-accent text-primary font-bold py-3 rounded-2xl hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(200,169,106,0.35)] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? "Saving..."
          : userReview
          ? "Update review"
          : "Publish review"}
      </button>
    </form>
  );
}