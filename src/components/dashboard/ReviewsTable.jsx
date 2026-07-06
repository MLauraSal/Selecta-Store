import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import RankingStars from "../reviews/RankingStars";
import {
  getAllReviews,
  deleteReview,
} from "../../services/reviewService";

const tableCellStyles = {
  color: "#FFFFFF",
  borderColor: "#2A2A2A",
};

export default function ReviewsTable() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAllReviews = async () => {
    try {
      setLoading(true);
      const data = await getAllReviews();
      setReviews(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllReviews();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this review?")) {
      await deleteReview(id);
      setReviews((prev) => prev.filter((review) => review.id !== id));
    }
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-accent uppercase tracking-[4px] text-xs">
          Reviews
        </p>

        <h2 className="text-2xl font-black text-text">
          Review moderation
        </h2>
      </div>

      <TableContainer
        sx={{
          backgroundColor: "#111111",
          border: "1px solid #2A2A2A",
          borderRadius: "24px",
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#181818" }}>
              {["User", "Product ID", "Ranking", "Comment", "Actions"].map(
                (head) => (
                  <TableCell
                    key={head}
                    align={head === "Actions" ? "right" : "left"}
                    sx={{
                      ...tableCellStyles,
                      color: "#C8A96A",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      fontSize: "11px",
                    }}
                  >
                    {head}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={tableCellStyles}>
                  Loading reviews...
                </TableCell>
              </TableRow>
            ) : reviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={tableCellStyles}>
                  There are no reviews.
                </TableCell>
              </TableRow>
            ) : (
              reviews.map((review) => (
                <TableRow
                  key={review.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(200,169,106,0.06)",
                    },
                  }}
                >
                  <TableCell sx={tableCellStyles}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={review.userPhoto}
                        sx={{
                          border: "2px solid #C8A96A",
                          backgroundColor: "#181818",
                          color: "#C8A96A",
                        }}
                      >
                        {review.userName?.charAt(0)?.toUpperCase() || "U"}
                      </Avatar>

                      <span className="font-bold text-text">
                        {review.userName || "User"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell sx={tableCellStyles}>
                    <span className="text-gray-400 text-xs">
                      {review.productId}
                    </span>
                  </TableCell>

                  <TableCell sx={tableCellStyles}>
                    <RankingStars ranking={review.ranking} size={17} />
                  </TableCell>

                  <TableCell sx={tableCellStyles}>
                    <p className="text-gray-400 max-w-[420px] line-clamp-2">
                      {review.comment}
                    </p>
                  </TableCell>

                  <TableCell align="right" sx={tableCellStyles}>
                    <IconButton
                      onClick={() => handleDelete(review.id)}
                      sx={{
                        color: "#ff6b6b",
                        border: "1px solid #2A2A2A",
                        "&:hover": {
                          backgroundColor: "rgba(255,107,107,0.12)",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}