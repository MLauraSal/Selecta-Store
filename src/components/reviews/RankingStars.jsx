import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

export default function RankingStars({
  ranking = 0,
  size = 20,
  interactive = false,
  onChange,
}) {
  const handleClick = (value) => {
    if (!interactive || !onChange) return;
    onChange(value);
  };

  return (
    <div className="flex items-center gap-1 text-accent">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = ranking >= star;
        const isHalf = ranking >= star - 0.5 && ranking < star;

        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => handleClick(star)}
            className={interactive ? "cursor-pointer hover:scale-110 transition" : "cursor-default"}
          >
            {isFull ? (
              <IoStar size={size} />
            ) : isHalf ? (
              <IoStarHalf size={size} />
            ) : (
              <IoStarOutline size={size} />
            )}
          </button>
        );
      })}
    </div>
  );
}