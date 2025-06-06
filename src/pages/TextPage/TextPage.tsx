import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Stack,
} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';

// Placeholder for ChatGPT API call
async function generateTattooIdea(prompt: string): Promise<string> {
  // Replace this with actual API call to your backend or OpenAI
  // For now, return a mock response after a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `Tattoo idea for: "${prompt}"\n\nA beautifully detailed design featuring your description, blending artistic elements and symbolism for a unique tattoo.`
      );
    }, 1500);
  });
}

const TextPage = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setImageUrl("");
    try {
      const res = await fetch('/api/generate-tattoo-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      if (!res.ok) throw new Error('Failed to generate tattoo image');
      const data = await res.json();
      setImageUrl(data.imageUrl);
    } catch (e) {
      setError("Failed to generate tattoo image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e1e2f, #2c2c54)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
      }}
    >
      <Typography variant="h3" sx={{ mb: 4 }}>
        Tattoo Generator
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        sx={{ width: "100%", maxWidth: 1100 }}
        alignItems="stretch"
        justifyContent="center"
      >
        {/* Input Section */}
        <Paper
          sx={{
            flex: 1,
            minWidth: 320,
            maxWidth: 500,
            p: 4,
            bgcolor: "#23234a",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Describe your tattoo idea
          </Typography>
          <TextField
            label="Tattoo Prompt"
            placeholder="Enter the descripton of the tattoo in your head. You can start with style and objects and add more details."
            variant="outlined"
            multiline
            rows={6}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth
            sx={{
              mb: 3,
              backgroundColor: "#1e1e2f",
              borderRadius: 2,
              input: { color: "#fff" },
              textarea: { color: "#fff" },
              "& .MuiInputLabel-root": { color: "#ccc" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#444" },
                "&:hover fieldset": { borderColor: "#888" },
                "&.Mui-focused fieldset": { borderColor: "#aaa" },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            sx={{ mt: 2 }}
          >
            Generate
          </Button>
        </Paper>
        {/* Result Section */}
        <Paper
          sx={{
            flex: 1,
            minWidth: 320,
            maxWidth: 500,
            p: 4,
            bgcolor: "#fff",
            color: "#23234a",
            borderRadius: 3,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: "#23234a" }}>
            Generated Tattoo Image
          </Typography>
          {loading ? (
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress color="inherit" />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : imageUrl ? (
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={imageUrl} alt="Generated tattoo" style={{ maxWidth: "100%", borderRadius: 8, marginBottom: 16 }} />
              <IconButton
                component="a"
                href={imageUrl}
                download="tattoo.png"
                sx={{ bgcolor: '#23234a', color: '#fff', '&:hover': { bgcolor: '#1e1e2f' } }}
              >
                <DownloadIcon />
              </IconButton>
            </Box>
          ) : (
            <Typography sx={{ color: "#888" }}>
              The generated tattoo image will appear here.
            </Typography>
          )}
        </Paper>
      </Stack>
    </Box>
  );
};

export default TextPage;
