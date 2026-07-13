import { useEffect } from "react";
import { useReviews } from "../../hooks/useReviews";
import RankingStars from "./RankingStars";

export default function ProductRankingBadge({
  productId,
  size = 16,
}) {
  const {
    loadReviews,
    getAverage,
    getReviews,
  } = useReviews();

  useEffect(() => {
    loadReviews(productId);
  }, [loadReviews, productId]);

  const reviews = getReviews(productId);
  const average = getAverage(productId);

  return (
    <div className="flex items-center gap-2 mt-4">
      <RankingStars
        ranking={average}
        size={size}
      />

      <span className="text-gray-400 text-xs">
        {reviews.length > 0
          ? `${average} (${reviews.length})`
          : "No reviews"}
      </span>
    </div>
  );
}