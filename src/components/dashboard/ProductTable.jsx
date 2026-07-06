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
  TextField,
  MenuItem,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ProductFormModal from "./ProductFormModal";
import { useState, useEffect } from "react";
import useProducts from "../../hooks/useProducts";
import { useCategory } from "../../hooks/useCategory";
import { getProductImage } from "../../utils/getProductImage";

const ITEMS_PER_PAGE = 10;

const tableCellStyles = {
  color: "#FFFFFF",
  borderColor: "#2A2A2A",
};

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
  "& .MuiInputLabel-root": {
    color: "#9CA3AF",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#C8A96A",
  },
};

export default function ProductTable() {
  const {
    products = [],
    addProduct,
    editProduct,
    removeProduct,
    loading,
  } = useProducts();

  const { categories = [] } = useCategory();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [orderBy, setOrderBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);

  const handleAdd = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await removeProduct(id);
    }
  };

  const handleSave = async (productData) => {
    if (selectedProduct) {
      await editProduct(selectedProduct.id, productData);
    } else {
      await addProduct(productData);
    }

    setModalOpen(false);
  };

  const getCategory = (category) => {
    if (typeof category === "object") return category?.name || "Uncategorized";
    return category || "Uncategorized";
  };

  const filteredProducts = products
    .filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const category = getCategory(product.category).toLowerCase();

      const matchesSearch = name.includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "all"
          ? true
          : category === categoryFilter.toLowerCase();

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (orderBy === "name") {
        return a.name.localeCompare(b.name);
      }

      if (orderBy === "price") {
        return Number(a.price) - Number(b.price);
      }

      if (orderBy === "stock") {
        return Number(a.stock) - Number(b.stock);
      }

      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter, orderBy]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <TextField
          label="Search product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={inputStyles}
        />

        <TextField
          select
          label="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          fullWidth
          sx={inputStyles}
        >
          <MenuItem value="all">All categories</MenuItem>

          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Order by"
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
          fullWidth
          sx={inputStyles}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="stock">Stock</MenuItem>
        </TextField>
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
                "Price",
                "Stock",
                "Category",
                "Subcategory",
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
                <TableCell colSpan={8} align="center" sx={tableCellStyles}>
                  Loading products...
                </TableCell>
              </TableRow>
            ) : paginatedProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={tableCellStyles}>
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedProducts.map((product) => (
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
                      src={getProductImage(product)}
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
                    <span className="bg-white/5 text-gray-300 border border-[#2A2A2A] px-3 py-1 rounded-full text-xs font-bold">
                      {product.subcategory || "No subcategory"}
                    </span>
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

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-5 py-3 rounded-2xl border border-[#2A2A2A] text-text disabled:opacity-40 disabled:cursor-not-allowed hover:border-accent hover:text-accent transition"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-11 h-11 rounded-2xl border transition ${
                currentPage === index + 1
                  ? "bg-accent text-primary border-accent"
                  : "border-[#2A2A2A] text-text hover:border-accent hover:text-accent"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-5 py-3 rounded-2xl border border-[#2A2A2A] text-text disabled:opacity-40 disabled:cursor-not-allowed hover:border-accent hover:text-accent transition"
          >
            Next
          </button>
        </div>
      )}

      <ProductFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={selectedProduct}
      />
    </div>
  );
}