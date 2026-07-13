import { useEffect, useState } from "react";
import RankingStars from "./RankingStars";
import {
  getReviewsByProduct,
  getAverageRanking,
} from "../../services/reviewService";

export default function ProductRankingBadge({ productId, size = 16 }) {
  const [ranking, setRanking] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!productId) return;

    getReviewsByProduct(productId).then((data) => {
      setCount(data.length);
      setRanking(getAverageRanking(data));
    });
  }, [productId]);

  return (
    <div className="flex items-center gap-2 text-accent mt-4">
      <RankingStars ranking={ranking} size={size} />

      <span className="text-gray-400 text-xs">
        {ranking > 0 ? `${ranking} (${count})` : "No reviews"}
      </span>
    </div>
  );
}