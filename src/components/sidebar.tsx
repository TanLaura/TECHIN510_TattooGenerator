/// <reference types="vite-plugin-svgr/client" />
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactLogo from "../assets/icon.svg?react";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 220,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "#111",
        color: "#fff",
        px: 2,
        py: 3,
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      {/* Top: Logo and Main Nav */}
      <Box>
        {/* Logo with Link to Home page */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <ReactLogo width={40} height={40} fill="#fff" />
          {/* Use LogoIcon as a React component */}
          <Typography variant="h5" fontWeight="bold" ml={2}>
            TatTune
          </Typography>
        </Link>

        <Typography variant="caption" sx={{ pl: 1, color: "#aaa", mb: 1 }}>
          Navigation
        </Typography>
        <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <ListItemButton onClick={() => navigate("/text-idea")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <TextFieldsIcon />
            </ListItemIcon>
            <ListItemText primary="Create" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/browse-ideas")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <ImageIcon />
            </ListItemIcon>
            <ListItemText primary="Gallery" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/locations")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Locations" />
          </ListItemButton>
        </List>
      </Box>

      {/* Bottom: Account */}
      <Box>
        <Divider sx={{ borderColor: "#444", mb: 1 }} />
        <List>
          <ListItemButton onClick={() => navigate("/account")}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
