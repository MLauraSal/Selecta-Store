import {
  IoStar,
  IoStarHalf,
  IoStarOutline,
} from "react-icons/io5";

export default function RankingStars({
  ranking = 0,
  size = 20,
  interactive = false,
  onChange,
}) {
  return (
    <div className="flex items-center gap-1 text-accent">
      {[1, 2, 3, 4, 5].map((star) => {
        const icon =
          ranking >= star ? (
            <IoStar size={size} />
          ) : ranking >= star - 0.5 ? (
            <IoStarHalf size={size} />
          ) : (
            <IoStarOutline size={size} />
          );

        if (!interactive) {
          return (
            <span key={star}>
              {icon}
            </span>
          );
        }

        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="cursor-pointer hover:scale-110 transition"
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
}