import { useState,useEffect } from "react";
import Swal from "sweetalert2";
import RankingStars from "./RankingStars";

export default function ReviewFormContent({ 
  productId, 
  user, 
  userReview, 
  addReview, 
  editReview 
}) {
  const [ranking, setRanking] = useState(userReview?.ranking || 5);
  const [comment, setComment] = useState(userReview?.comment || "");
  const [loading, setLoading] = useState(false);



  useEffect(() => {
  setRanking(userReview?.ranking || 5);
  setComment(userReview?.comment || "");
}, [userReview]);

 const buildReviewData = () => ({
  productId: String(productId),
  userId: user.uid,
  userName: user.name || user.username || "User",
  userPhoto: user.profilePic || "",
  ranking: Number(ranking),
  comment: comment.trim(),
});


  const showSuccessAlert = (title) => {
    Swal.fire({
      icon: "success",
      title,
      timer: 1300,
      showConfirmButton: false,
      background: "#111111",
      color: "#FFFFFF",
      confirmButtonColor: "#C8A96A",
    });
  };

 


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !comment.trim()) return;

    try {
      setLoading(true);

      const reviewData = buildReviewData();

if (userReview) {
    await editReview(userReview.id, reviewData);
    showSuccessAlert("Review updated");
} else {
    await addReview(reviewData);
    showSuccessAlert("Review published");
}
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire({
        icon: "error",
        title: "Error en la review",
        text: error.message || "No se pudo guardar tu comentario.",
        background: "#111111",
        color: "#FFFFFF",
        confirmButtonColor: "#C8A96A",
      });
    } finally {
      setLoading(false);
    }
  };

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
        className="w-full bg-accent text-primary font-bold py-4 rounded-2xl hover:shadow-[0_0_30px_rgba(200,169,106,0.2)] disabled:opacity-50 disabled:hover:shadow-none transition-all duration-300"
      >
        {loading ? "Saving..." : userReview ? "Update Review" : "Publish Review"}
      </button>
    </form>
  );
}