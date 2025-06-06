import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #1e1e2f, #2c2c54)",
        color: "#fff",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
        TatTune
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{ maxWidth: 600, mb: 6, color: "#ccc" }}
      >
        Discover your next tattoo and connect with a community that loves ink.
      </Typography>

      <Stack direction="row" spacing={3}>
        <Button
          variant="contained"
          onClick={() => navigate("/text-idea")}
          sx={{
            backgroundColor: "#6c63ff",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "20px",
            fontSize: "1rem",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              backgroundColor: "#5a54d1",
            },
          }}
        >
          Generate Designs
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate("/browse-ideas")}
          sx={{
            backgroundColor: "#ff6584",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "20px",
            fontSize: "1rem",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              backgroundColor: "#e65373",
            },
          }}
        >
          Browse Gallery
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate("/locations")}
          sx={{
            backgroundColor: "#249e8c",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "20px",
            fontSize: "1rem",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              backgroundColor: "#19796a",
            },
          }}
        >
          Find Locations
        </Button>
      </Stack>
    </Box>
  );
};

export default HomePage;
