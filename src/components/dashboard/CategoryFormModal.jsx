import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

import { useState, useEffect } from "react";

const inputStyles = {
  "& .MuiInputBase-root": {
    backgroundColor: "#111111",
    color: "#FFFFFF",
    borderRadius: "16px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#2A2A2A",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#C8A96A",
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#C8A96A",
  },
  "& .MuiInputLabel-root": {
    color: "#9CA3AF",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#C8A96A",
  },
};

export default function CategoryFormModal({
  open,
  onClose,
  onSave,
  initialData,
}) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    subcategory: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        image: initialData.image || "",
        subcategory: Array.isArray(initialData.subcategory)
          ? initialData.subcategory.join(", ")
          : initialData.subcategory || "",
      });
    } else {
      setFormData({
        name: "",
        image: "",
        subcategory: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name) return;

    onSave({
      name: formData.name,
      image: formData.image,
      subcategory: formData.subcategory
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: "#181818",
          color: "#FFFFFF",
          borderRadius: "28px",
          border: "1px solid #2A2A2A",
          boxShadow: "0 20px 60px rgba(0,0,0,0.65)",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle sx={{ borderBottom: "1px solid #2A2A2A", px: 4, py: 3 }}>
        <p className="text-accent uppercase tracking-[5px] text-xs mb-4">
          Category
        </p>

        <h2 className="text-2xl font-black text-text">
          {initialData ? "Edit category" : "New category"}
        </h2>
      </DialogTitle>

      <DialogContent
        sx={{
          px: 4,
          py: 4,
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          sx={inputStyles}
        />

        <TextField
          label="Image URL"
          name="image"
          value={formData.image}
          onChange={handleChange}
          fullWidth
          sx={inputStyles}
        />

        {formData.image && (
          <div className="rounded-2xl overflow-hidden border border-[#2A2A2A] bg-primary">
            <img
              src={formData.image}
              alt={formData.name}
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        <TextField
          label="Subcategories separated by commas"
          name="subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          sx={inputStyles}
        />
      </DialogContent>

      <DialogActions sx={{ borderTop: "1px solid #2A2A2A", px: 4, py: 3 }}>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: "14px",
            px: 3,
            py: 1.2,
            color: "#C8A96A",
            border: "1px solid #C8A96A",
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            borderRadius: "14px",
            px: 3,
            py: 1.2,
            backgroundColor: "#C8A96A",
            color: "#111111",
            textTransform: "none",
            fontWeight: 800,
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}