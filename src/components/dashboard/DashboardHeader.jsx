import { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AuthContext from "../../contexts/AuthContext";

export default function DashboardHeader() {
  const { user } = useContext(AuthContext);

  const displayName = user?.name || user?.username || "Administrator";
  const avatar = user?.profilePic || user?.avatar || user?.photoURL || "";

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "#111111",
        borderBottom: "1px solid #2A2A2A",
      }}
    >
      <Toolbar className="flex justify-between min-h-[80px]">
        <div className="flex items-center gap-3">
          <IconButton
            edge="start"
            sx={{
              color: "#FFFFFF",
              display: { lg: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>

          <div>
            <p className="text-accent uppercase tracking-[4px] text-[10px]">
              Admin Panel
            </p>

            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 800,
                color: "#FFFFFF",
              }}
            >
              Dashboard
            </Typography>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-text text-sm font-semibold">
              {displayName}
            </p>

            <p className="text-gray-400 text-xs">
              Administrator
            </p>
          </div>

          <Avatar
            alt={displayName}
            src={avatar}
            sx={{
              width: 46,
              height: 46,
              border: "2px solid #C8A96A",
              backgroundColor: "#181818",
              color: "#C8A96A",
              fontWeight: 800,
            }}
          >
            {displayName.charAt(0).toUpperCase()}
          </Avatar>
        </div>
      </Toolbar>
    </AppBar>
  );
}
    );
  };
  
  
