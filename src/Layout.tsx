import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import HomePage from "./pages/HomePage/HomePage";
import Sidebar from "./components/sidebar";
import TextPage from "./pages/TextPage/TextPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import LocationPage from "./pages/Location/LocationPage";
import LocationsPage from "./pages/Location/LocationPage";

export default function Layout() {
  const location = useLocation();
  const showSidebar = location.pathname !== "/";

  return (
    <Box sx={{ display: "flex" }}>
      {showSidebar && <Sidebar />}
      <Box sx={{ flexGrow: 1, ml: showSidebar ? "220px" : 0 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/text-idea" element={<TextPage />} />
          <Route path="/browse-ideas" element={<GalleryPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </Box>
    </Box>
  );
}
