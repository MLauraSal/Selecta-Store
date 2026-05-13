import * as React from "react";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Person from "@mui/icons-material/Person";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AccountMenu({ user, logout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleClose();

    Swal.fire({
      icon: "info",
      title: "Session closed",
      text: "Your session was successfully closed.",
      timer: 1500,
      showConfirmButton: false,
      background: "#111111",
      color: "#FFFFFF",
      confirmButtonColor: "#C8A96A",
    });

    navigate("/");
  };

  if (!user) return null;

  const avatarImage =
    user.profilePic || user.avatar || user.photoURL || user.image || "";

  const displayName = user.name || user.username || "User";

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Tooltip title="Account options">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            ml: 1,
            border: "1px solid #2A2A2A",
            backgroundColor: "#181818",
            transition: "0.3s",

            "&:hover": {
              backgroundColor: "#C8A96A",
              borderColor: "#C8A96A",
              boxShadow: "0 0 20px rgba(200,169,106,0.35)",
            },
          }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            src={avatarImage}
            alt={displayName}
            sx={{
              width: 34,
              height: 34,
              border: "2px solid #C8A96A",
              backgroundColor: "#111111",
              color: "#C8A96A",
              fontWeight: 700,
            }}
          >
            {displayName.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              mt: 1.5,
              minWidth: 260,
              overflow: "visible",
              borderRadius: "22px",
              backgroundColor: "#111111",
              color: "#FFFFFF",
              border: "1px solid #2A2A2A",
              boxShadow: "0 20px 50px rgba(0,0,0,0.55)",
              p: 1,

              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 18,
                width: 12,
                height: 12,
                backgroundColor: "#111111",
                borderLeft: "1px solid #2A2A2A",
                borderTop: "1px solid #2A2A2A",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },

              "& .MuiMenuItem-root": {
                borderRadius: "14px",
                px: 2,
                py: 1.3,
                fontSize: "14px",
                transition: "0.25s",

                "&:hover": {
                  backgroundColor: "rgba(200,169,106,0.12)",
                  color: "#C8A96A",
                },
              },

              "& .MuiListItemIcon-root": {
                color: "#C8A96A",
                minWidth: 36,
              },
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 2,
            py: 2,
          }}
        >
          <Avatar
            src={avatarImage}
            alt={displayName}
            sx={{
              width: 48,
              height: 48,
              border: "2px solid #C8A96A",
              backgroundColor: "#181818",
              color: "#C8A96A",
              fontWeight: 700,
            }}
          >
            {displayName.charAt(0).toUpperCase()}
          </Avatar>

          <Box>
            <Typography
              sx={{
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1.2,
              }}
            >
              {displayName}
            </Typography>

            <Typography
              sx={{
                fontSize: "12px",
                color: "#999999",
                mt: 0.5,
              }}
            >
              {user.email || "My account"}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "#2A2A2A", my: 1 }} />

        <MenuItem onClick={() => navigate("/profile")}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          My profile
        </MenuItem>

        {user.role === "admin" && (
          <MenuItem onClick={() => navigate("/dashboard")}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Dashboard
          </MenuItem>
        )}

        <Divider sx={{ borderColor: "#2A2A2A", my: 1 }} />

        <MenuItem
          onClick={handleLogout}
          sx={{
            color: "#ff6b6b",

            "& .MuiListItemIcon-root": {
              color: "#ff6b6b",
            },

            "&:hover": {
              backgroundColor: "rgba(255,107,107,0.12)",
              color: "#ff6b6b",
            },
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Log out
        </MenuItem>
      </Menu>
    </Box>
  );
}