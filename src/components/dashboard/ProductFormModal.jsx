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

export default function ProductFormModal({
  open,
  onClose,
  onSave,
  initialData,
}) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    images: [],
    imageUrlsText: "",
    description: "",
    category: "",
    subcategory: "",
  });

  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (initialData) {
      const images = initialData.images || initialData.image || [];
      const imagesArray = Array.isArray(images) ? images : [images].filter(Boolean);

      setFormData({
        name: initialData.name || "",
        price: initialData.price || "",
        stock: initialData.stock || "",
        images: imagesArray,
        imageUrlsText: imagesArray.join("\n"),
        description: initialData.description || "",
        category:
          typeof initialData.category === "object"
            ? initialData.category?.name || ""
            : initialData.category || "",
        subcategory: initialData.subcategory || "",
      });

      setPreviewImages(imagesArray);
    } else {
      setFormData({
        name: "",
        price: "",
        stock: "",
        images: [],
        imageUrlsText: "",
        description: "",
        category: "",
        subcategory: "",
      });

      setPreviewImages([]);
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "imageUrlsText") {
      const urls = value
        .split("\n")
        .map((url) => url.trim())
        .filter(Boolean);

      setFormData((prev) => ({
        ...prev,
        imageUrlsText: value,
        images: urls,
      }));

      setPreviewImages(urls);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    const localPreviews = files.map((file) => URL.createObjectURL(file));

    const updatedImages = [...formData.images, ...localPreviews];

    setPreviewImages(updatedImages);

    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
      imageUrlsText: updatedImages.join("\n"),
    }));
  };

  const handleRemoveImage = (imageToRemove) => {
    const updatedImages = previewImages.filter((img) => img !== imageToRemove);

    setPreviewImages(updatedImages);

    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
      imageUrlsText: updatedImages.join("\n"),
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.stock) return;

    onSave({
      name: formData.name,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      images: formData.images,
      image: formData.images,
      description: formData.description,
      category: formData.category,
      subcategory: formData.subcategory,
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
      <DialogTitle
        sx={{
          borderBottom: "1px solid #2A2A2A",
          px: 4,
          py: 3,
        }}
      >
        <p className="text-accent uppercase tracking-[5px] text-xs mb-4">
          Product
        </p>

        <h2 className="text-2xl font-black text-text">
          {initialData ? "Editar producto" : "Nuevo producto"}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            fullWidth
            sx={inputStyles}
          />

          <TextField
            label="Stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            type="number"
            fullWidth
            sx={inputStyles}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Upload product images
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesChange}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-3 file:px-5 file:rounded-2xl file:border-0 file:text-sm file:font-bold file:bg-accent file:text-primary hover:file:shadow-[0_0_20px_rgba(200,169,106,0.35)]"
          />
        </div>

        <TextField
          label="Image URLs - one per line"
          name="imageUrlsText"
          value={formData.imageUrlsText}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          sx={inputStyles}
        />

        {previewImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {previewImages.map((img, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden border border-[#2A2A2A] bg-primary"
              >
                <img
                  src={img}
                  alt={`preview-${index}`}
                  className="w-full h-28 object-cover"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveImage(img)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white hover:bg-red-500 transition"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <TextField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
          sx={inputStyles}
        />

        <TextField
          label="Subcategory"
          name="subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          fullWidth
          sx={inputStyles}
        />

        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          sx={inputStyles}
        />
      </DialogContent>

      <DialogActions
        sx={{
          borderTop: "1px solid #2A2A2A",
          px: 4,
          py: 3,
          gap: 2,
        }}
      >
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
            "&:hover": {
              backgroundColor: "rgba(200,169,106,0.12)",
            },
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
            "&:hover": {
              backgroundColor: "#d8b77a",
              boxShadow: "0 0 25px rgba(200,169,106,0.35)",
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}