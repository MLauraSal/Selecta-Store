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
  
  export default function ProductFormModal  ({ open, onClose, onSave, initialData }) {
    const [formData, setFormData] = useState({
      name: "",
      price: "",
      stock: "",
      image: "",
      description: "",
      category: "",
    });
  
    useEffect(() => {
      if (initialData) {
        setFormData({
          ...initialData,
          image: Array.isArray(initialData.image)
            ? initialData.image[0]
            : initialData.image || "",
          description: initialData.description || "",
          category:
            typeof initialData.category === "object"
              ? initialData.category?.name || ""
              : initialData.category || "",
        });
      } else {
        setFormData({
          name: "",
          price: "",
          stock: "",
          image: "",
          description: "",
          category: "",
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
      if (formData.name && formData.price && formData.stock) {
        onSave({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        });
  
        onClose();
      }
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
          <p className="text-accent uppercase tracking-[5px] text-xs mb-2">
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
  
          <TextField
            label="URL from image"
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
                alt="preview"
                className="w-full h-48 object-cover"
              />
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
  };
  
  