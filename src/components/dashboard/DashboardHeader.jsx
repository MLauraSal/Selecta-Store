import {
    AppBar,
    Toolbar,
    Typography,
    Avatar,
    IconButton,
  } from "@mui/material";
  
  import MenuIcon from "@mui/icons-material/Menu";
  
  export default function DashboardHeader () {
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
                Mariana Salgueiro
              </p>
  
              <p className="text-gray-400 text-xs">
                Administrator
              </p>
            </div>
  
            <Avatar
              alt="Admin"
              src="/profile.jpg"
              sx={{
                width: 46,
                height: 46,
                border: "2px solid #C8A96A",
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
    );
  };
  
  