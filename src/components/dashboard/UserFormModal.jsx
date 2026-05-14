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
  
  const UserFormModal = ({ open, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
    });
  
    useEffect(() => {
      if (initialData) {
        setFormData({
          name: initialData.name || "",
          email: initialData.email || "",
        });
      } else {
        setFormData({
          name: "",
          email: "",
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
      if (formData.name && formData.email) {
        onSave(formData);
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
            User
          </p>
  
          <h2 className="text-2xl font-black text-text">
            {initialData ? "Edit user" : "New user"}
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
            fullWidth
            value={formData.name}
            onChange={handleChange}
            sx={inputStyles}
          />
  
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
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
  
 export default UserFormModal;