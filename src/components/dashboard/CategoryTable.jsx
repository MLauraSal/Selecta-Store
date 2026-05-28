import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
    Avatar,
  } from "@mui/material";
  
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  
  import CategoryFormModal from "./CategoryFormModal";
  import { useState } from "react";
  import useCategory from "../../hooks/useCategory";
  
  const tableCellStyles = {
    color: "#FFFFFF",
    borderColor: "#2A2A2A",
  };
  
  export default function CategoryTable() {
    const {
      categories = [],
      addCategory,
      editCategory,
      removeCategory,
      loadingCategories,
    } = useCategory();
  
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
  
    const handleAdd = () => {
      setSelectedCategory(null);
      setModalOpen(true);
    };
  
    const handleEdit = (category) => {
      setSelectedCategory(category);
      setModalOpen(true);
    };
  
    const handleDelete = (id) => {
      if (confirm("Are you sure you want to delete this category?")) {
        removeCategory(id);
      }
    };
  
    const handleSave = (categoryData) => {
      if (selectedCategory) {
        editCategory(selectedCategory.id, categoryData);
      } else {
        addCategory(categoryData);
      }
  
      setModalOpen(false);
    };
  
    return (
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <p className="text-accent uppercase tracking-[4px] text-xs">
              Category
            </p>
  
            <h2 className="text-2xl font-black text-text">
              Category Management
            </h2>
          </div>
  
          <Button
            onClick={handleAdd}
            sx={{
              backgroundColor: "#C8A96A",
              color: "#111111",
              borderRadius: "16px",
              px: 3,
              py: 1.2,
              fontWeight: 800,
              textTransform: "none",
            }}
          >
            New Category
          </Button>
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
                {["Image", "Name", "Subcategories", "Actions"].map((head) => (
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
                ))}
              </TableRow>
            </TableHead>
  
            <TableBody>
              {loadingCategories ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={tableCellStyles}>
                    Loading categories...
                  </TableCell>
                </TableRow>
              ) : categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={tableCellStyles}>
                    There are no categories.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow
                    key={category.id}
                    sx={{
                      transition: "0.3s",
                      "&:hover": {
                        backgroundColor: "rgba(200,169,106,0.06)",
                      },
                    }}
                  >
                    <TableCell sx={tableCellStyles}>
                      <Avatar
                        variant="rounded"
                        src={category.image || "/img/no-image.png"}
                        alt={category.name}
                        sx={{
                          width: 58,
                          height: 58,
                          borderRadius: "14px",
                          border: "1px solid #2A2A2A",
                          backgroundColor: "#181818",
                        }}
                      />
                    </TableCell>
  
                    <TableCell sx={tableCellStyles}>
                      <p className="font-bold text-text">{category.name}</p>
                    </TableCell>
  
                    <TableCell sx={tableCellStyles}>
                      <div className="flex flex-wrap gap-2">
                      {category.subcategory?.map((item) => (
  <span key={item}>
    {item}
  </span>
))}
                      </div>
                    </TableCell>
  
                    <TableCell align="right" sx={tableCellStyles}>
                      <IconButton
                        onClick={() => handleEdit(category)}
                        sx={{
                          color: "#C8A96A",
                          border: "1px solid #2A2A2A",
                          mr: 1,
                        }}
                      >
                        <EditIcon />
                      </IconButton>
  
                      <IconButton
                        onClick={() => handleDelete(category.id)}
                        sx={{
                          color: "#ff6b6b",
                          border: "1px solid #2A2A2A",
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
  
        <CategoryFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initialData={selectedCategory}
        />
      </div>
    );
  }