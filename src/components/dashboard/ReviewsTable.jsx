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
        <p className="text-accent uppercase tracking-[4px] text-xs mb-1">
          Feedback Overview
        </p>
        <h2 className="text-2xl font-black text-text">Customer Reviews</h2>
      </div>

      <TableContainer
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="reviews table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...tableCellStyles, fontWeight: "bold" }}>
                User
              </TableCell>
              <TableCell sx={{ ...tableCellStyles, fontWeight: "bold" }}>
                Product ID
              </TableCell>
              <TableCell sx={{ ...tableCellStyles, fontWeight: "bold" }}>
                Rating
              </TableCell>
              <TableCell sx={{ ...tableCellStyles, fontWeight: "bold" }}>
                Comment
              </TableCell>
              <TableCell
                align="right"
                sx={{ ...tableCellStyles, fontWeight: "bold" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={tableCellStyles}>
                  <p className="text-gray-400 italic py-4">Loading reviews...</p>
                </TableCell>
              </TableRow>
            ) : reviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={tableCellStyles}>
                  <p className="text-gray-400 italic py-4">No reviews found.</p>
                </TableCell>
              </TableRow>
            ) : (
              reviews.map((review) => (
                <TableRow
                  key={review.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={tableCellStyles}>
                    <div className="flex items-center gap-3">
                    
                       <Avatar
  src={review.userPhoto || undefined}
  alt={review.userName}
  imgProps={{
    referrerPolicy: "no-referrer",
  }}
  sx={{
    width: 44,
    height: 44,
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
                    <div className="flex items-center gap-1 text-accent text-base">
                    <RankingStars
  ranking={review.ranking}
  size={18}
/>
                    </div>
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