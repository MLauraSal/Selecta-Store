import { Link } from "react-router-dom";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { BsTrash3Fill } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa6";

import { useCart } from "../../hooks/useCart";
import { getProductImage } from "../../utils/getProductImage";

const Cart = ({ isOpen, toggleCart }) => {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={toggleCart}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 430 },
          background: "#111111",
          color: "#FFFFFF",
          borderLeft: "1px solid #2A2A2A",
        },
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            p: 3,
            borderBottom: "1px solid #2A2A2A",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#C8A96A",
                fontSize: "12px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              Your Cart
            </Typography>

            <Typography
              sx={{ fontSize: "28px", fontWeight: 800, color: "#FFFFFF" }}
            >
              Shopping Cart
            </Typography>
          </Box>

          <IconButton
            onClick={toggleCart}
            sx={{
              color: "#000000",
              border: "1px solid #2A2A2A",
              width: 45,
              height: 45,
              "&:hover": {
                background: "#C8A96A",
                color: "#111111",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
          {cartItems.length === 0 ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography
                sx={{ color: "#C8A96A", fontSize: "18px", fontWeight: 700 }}
              >
                Your cart is empty
              </Typography>

              <Typography
                sx={{ color: "#777", textAlign: "center", maxWidth: 250 }}
              >
                Add products to your cart and continue shopping.
              </Typography>
            </Box>
          ) : (
            cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mb: 3,
                    p: 2,
                    border: "1px solid #2A2A2A",
                    borderRadius: "24px",
                    background: "#181818",
                    transition: "0.3s",
                    "&:hover": {
                      borderColor: "#C8A96A",
                      boxShadow: "0 0 25px rgba(200,169,106,0.12)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={getProductImage(item)}
                    alt={item.name}
                    sx={{
                      width: 90,
                      height: 90,
                      objectFit: "cover",
                      borderRadius: "18px",
                      border: "1px solid #2A2A2A",
                    }}
                  />

                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "#FFFFFF",
                          fontWeight: 700,
                          fontSize: "16px",
                          lineHeight: 1.3,
                          mb: 1,
                        }}
                      >
                        {item.name}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#C8A96A",
                          fontSize: "22px",
                          fontWeight: 800,
                        }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          background: "#111111",
                          border: "1px solid #2A2A2A",
                          borderRadius: "14px",
                          px: 1,
                          py: 0.5,
                        }}
                      >
                        <IconButton
                          onClick={() => decreaseQuantity(item.id)}
                          sx={{
                            color: "#FFFFFF",
                            width: 30,
                            height: 30,
                            "&:hover": {
                              background: "#C8A96A",
                              color: "#111111",
                            },
                          }}
                        >
                          <FaMinus size={12} />
                        </IconButton>

                        <Typography
                          sx={{
                            color: "#FFFFFF",
                            fontWeight: 700,
                            minWidth: 20,
                            textAlign: "center",
                          }}
                        >
                          {item.quantity}
                        </Typography>

                        <IconButton
                          onClick={() => increaseQuantity(item.id)}
                          sx={{
                            color: "#FFFFFF",
                            width: 30,
                            height: 30,
                            "&:hover": {
                              background: "#C8A96A",
                              color: "#111111",
                            },
                          }}
                        >
                          <FaPlus size={12} />
                        </IconButton>
                      </Box>

                      <IconButton
                        onClick={() => removeFromCart(item.id)}
                        sx={{
                          color: "#888",
                          "&:hover": {
                            color: "#ff4d4d",
                            background: "transparent",
                          },
                        }}
                      >
                        <BsTrash3Fill size={16} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            ))
          )}
        </Box>

        {cartItems.length > 0 && (
          <Box
            sx={{
              p: 3,
              borderTop: "1px solid #2A2A2A",
              background: "linear-gradient(to top, #0A0A0A, #111111)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography sx={{ color: "#888", fontSize: "16px" }}>
                Total
              </Typography>
              <Typography
                sx={{ color: "#C8A96A", fontSize: "34px", fontWeight: 900 }}
              >
                ${cartTotal.toFixed(2)}
              </Typography>
            </Box>

            <Divider sx={{ borderColor: "#2A2A2A", mb: 3 }} />

          

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                <Button
              variant="outlined"
              onClick={clearCart}
              sx={{
                borderColor: "#ff6b6b",
                color: "#ff6b6b",
                borderRadius: "18px",
                py: 1.5,
                fontWeight: 700,
                textTransform: "none",
                fontSize: "16px",
                "&:hover": {
                  borderColor: "#ff6b6b",
                  background: "rgba(255,107,107,0.12)",
                },
              }}
            >
              Clear cart
            </Button>
              <Button
                variant="outlined"
                onClick={toggleCart}
                sx={{
                  borderColor: "#C8A96A",
                  color: "#C8A96A",
                  borderRadius: "18px",
                  py: 1.5,
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "16px",
                  "&:hover": {
                    borderColor: "#C8A96A",
                    background: "#C8A96A",
                    color: "#111111",
                  },
                }}
              >
                Continue Shopping
              </Button>

              <Button
                component={Link}
                to="/checkout"
                variant="contained"
                sx={{
                  background: "#C8A96A",
                  color: "#111111",
                  borderRadius: "18px",
                  py: 1.8,
                  fontWeight: 800,
                  textTransform: "none",
                  fontSize: "16px",
                  "&:hover": {
                    background: "#d8b77a",
                    boxShadow: "0 0 30px rgba(200,169,106,0.35)",
                  },
                }}
              >
                Checkout
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default Cart;
