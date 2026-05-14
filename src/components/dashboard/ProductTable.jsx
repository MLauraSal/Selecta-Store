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
  
  import ProductFormModal from "./ProductFormModal";
  import { useState } from "react";
  import useProducts from "../../hooks/useProducts";
  
  const tableCellStyles = {
    color: "#FFFFFF",
    borderColor: "#2A2A2A",
  };
  
  export default function ProductTable () {
    const { products, addProduct, editProduct, removeProduct, loading } =
      useProducts();
  
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
  
    const handleAdd = () => {
      setSelectedProduct(null);
      setModalOpen(true);
    };
  
    const handleEdit = (product) => {
      setSelectedProduct(product);
      setModalOpen(true);
    };
  
    const handleDelete = (id) => {
      if (confirm("¿Are you sure you want to delete this product??")) {
        removeProduct(id);
      }
    };
  
    const handleSave = (productData) => {
      if (selectedProduct) {
        editProduct(selectedProduct.id, productData);
      } else {
        addProduct(productData);
      }
  
      setModalOpen(false);
    };
  
    const getImage = (image) => {
      if (Array.isArray(image)) return image[0];
      return image || "/img/no-image.png";
    };
  
    const getCategory = (category) => {
      if (typeof category === "object") return category?.name || "Uncategorized";
      return category || "Uncategorized";
    };
  
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-accent uppercase tracking-[4px] text-xs">
              Products
            </p>
            <h2 className="text-2xl font-black text-text">
            Product Management
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
              "&:hover": {
                backgroundColor: "#d8b77a",
                boxShadow: "0 0 25px rgba(200,169,106,0.35)",
              },
            }}
          >
            New Product
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
                {[
                  "Image",
                  "Name",
                  "price",
                  "Stock",
                  "Category",
                  "Description",
                  "Actions",
                ].map((head) => (
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={tableCellStyles}>
                    Loading products...
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={tableCellStyles}>
                  There are no products.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow
                    key={product.id}
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
                        src={getImage(product.image)}
                        alt={product.name}
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
                      <p className="font-bold text-text line-clamp-1">
                        {product.name}
                      </p>
                    </TableCell>
  
                    <TableCell sx={tableCellStyles}>
                      <span className="text-accent font-bold">
                        ${product.price}
                      </span>
                    </TableCell>
  
                    <TableCell sx={tableCellStyles}>
                      <span className="bg-accent/10 text-accent border border-accent/30 px-3 py-1 rounded-full text-xs font-bold">
                        {product.stock ?? 0}
                      </span>
                    </TableCell>
  
                    <TableCell sx={tableCellStyles}>
                      {getCategory(product.category)}
                    </TableCell>
  
                    <TableCell sx={tableCellStyles}>
                      <p className="text-gray-400 max-w-[260px] line-clamp-2">
                        {product.description}
                      </p>
                    </TableCell>
  
                    <TableCell align="right" sx={tableCellStyles}>
                      <IconButton
                        onClick={() => handleEdit(product)}
                        sx={{
                          color: "#C8A96A",
                          border: "1px solid #2A2A2A",
                          mr: 1,
                          "&:hover": {
                            backgroundColor: "rgba(200,169,106,0.12)",
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
  
                      <IconButton
                        onClick={() => handleDelete(product.id)}
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
  
        <ProductFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initialData={selectedProduct}
        />
      </div>
    );
  };
  
   