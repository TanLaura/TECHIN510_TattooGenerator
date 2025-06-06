import {
  Box,
  Typography,
  Card,
  CardMedia,
  Grid,
  IconButton,
  CardContent,
  Button,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DownloadIcon from "@mui/icons-material/Download";
import armImage from "../../assets/images/arm.jpg";
import catImage from "../../assets/images/cat.jpg";
import circleImage from "../../assets/images/circle.jpg";
import flowerImage from "../../assets/images/flower.jpg";
import legImage from "../../assets/images/leg.jpg";
import snakeImage from "../../assets/images/snake.jpg";
import angelWingsImage from "../../assets/images/angel-wings-behind-a-sword-roses.webp";
import melanisticFoxImage from "../../assets/images/melanistic-cross-fox-head-mixed-with.webp";
import intricateTattooImage from "../../assets/images/an-intricate-tattoo-design-inspired-by.webp";
import sharkImage from "../../assets/images/shark.webp";
import heartImage from "../../assets/images/heart.webp";
import chessQueenImage from "../../assets/images/chess-queen-chess-piece.webp";
import moonsGripImage from "../../assets/images/the-moons-got-a-grip-on-the-sea.webp";
import daisyFlowerImage from "../../assets/images/daisy-flower-and-lilly-flower-and-poppy.webp";
import sunshineImage from "../../assets/images/sunshine.webp";
import synthesizerImage from "../../assets/images/synthesizer-cirquit-geometric-design.webp";
import ghostImage from "../../assets/images/ghost.webp";
import galaxyImage from "../../assets/images/galaxy-filled-with-stars-mountains.webp";
import quotesSeeYouAgainImage from "../../assets/images/quotes-from-the-song-see-you-again-from.webp";
import wolfArmorImage from "../../assets/images/wolf-with-blue-eyes-on-armor-tattoo.webp";
import crownedLionImage from "../../assets/images/crowned-lion.webp";
import gothicTreeImage from "../../assets/images/gothic-tree-of-life-intertwined-with.webp";
import pineForestImage from "../../assets/images/pine-forest-wrap-around-and-family-tree.webp";
import fullSleeveSkullImage from "../../assets/images/full-sleeve-with-skull.webp";
import compassImage from "../../assets/images/compass.webp";
import { useState } from "react";

const sampleImages = [
  { url: armImage, artist: "溜溜", categories: ["blackwork", "flowers", "tribal"]},
  { url: catImage, artist: "Master Shifu", categories: ["blackwork", "animals"] },
  { url: circleImage, artist: "我的妈呀", categories: ["blackwork", "tribal"]},
  { url: flowerImage, artist: "Hannah Xiao", categories: ["blackwork", "flowers"] },
  { url: legImage, artist: "牛", categories: ["blackwork", "flowers", "minimalist"] },
  { url: snakeImage, artist: "吴博美", categories: ["blackwork", "animals"] },
  { url: angelWingsImage, artist: "溜溜", categories: ["colored", "flowers"] },
  { url: melanisticFoxImage, artist: "我的妈呀", categories: ["colored", "animals", "new school"] },
  { url: intricateTattooImage, artist: "吴博美", categories: ["colored", "new school"] },
  { url: sharkImage, artist: "Hannah Xiao", categories: ["colored", "animals", "new school"] },
  { url: heartImage, artist: "LTan", categories: ["colored", "new school"] },
  { url: chessQueenImage, artist: "溜溜", categories: ["blackwork", "minimalist"] },
  { url: moonsGripImage, artist: "AW", categories: ["blackwork", "minimalist"] },
  { url: daisyFlowerImage, artist: "Master Shifu", categories: ["blackwork", "minimalist", "flowers"] },
  { url: sunshineImage, artist: "吴博美", categories: ["blackwork", "minimalist"] },
  { url: synthesizerImage, artist: "牛", categories: ["blackwork", "minimalist", "new school"] },
  { url: ghostImage, artist: "AW", categories: ["blackwork", "minimalist"]},
  { url: galaxyImage, artist: "溜溜", categories: ["blackwork", "minimalist"] },
  { url: quotesSeeYouAgainImage, artist: "LTan", categories: ["blackwork", "minimalist", "quotes"] },
  { url: wolfArmorImage, artist: "我的妈呀", categories: ["blackwork", "animals", "new school"] },
  { url: crownedLionImage, artist: "Hannah Xiao", categories: ["blackwork", "animals", "new school"] },
  { url: gothicTreeImage, artist: "溜溜", categories: ["blackwork", "new school"] },
  { url: pineForestImage, artist: "Master Shifu", categories: ["blackwork", "minimalist", "new school"] },
  { url: fullSleeveSkullImage, artist: "AW", categories: ["blackwork"] },
  { url: compassImage, artist: "Hannah Xiao", categories: ["blackwork"] },
];

// Get unique categories from all images
type ImageType = typeof sampleImages[number];
const allCategories = Array.from(
  new Set(sampleImages.flatMap((img: ImageType) => img.categories))
);

const GalleryPage = () => {
  // Generate random base likes for each image
  const getRandomLikes = () => Math.floor(Math.random() * 100) + 1;
  const [likes, setLikes] = useState<number[]>(
    () => Array.from({ length: sampleImages.length }, getRandomLikes)
  );
  const [liked, setLiked] = useState<boolean[]>(
    new Array(sampleImages.length).fill(false)
  ); // Track if user has liked
  const [favorites, setFavorites] = useState<boolean[]>(
    new Array(sampleImages.length).fill(false)
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tab, setTab] = useState<'all' | 'favorites'>('all');

  const toggleLike = (index: number) => {
    const newLikes = [...likes];
    const newLikedState = [...liked];

    if (liked[index]) {
      newLikes[index] -= 1;
    } else {
      newLikes[index] += 1;
    }

    newLikedState[index] = !newLikedState[index];

    setLikes(newLikes);
    setLiked(newLikedState);
  };

  const toggleFavorite = (index: number) => {
    const newFavorites = [...favorites];
    newFavorites[index] = !newFavorites[index];
    setFavorites(newFavorites);
  };

  // Download handler
  const handleDownload = (url: string, artist: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${artist}-tattoo.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter images by selected category and tab
  const imagesByTab = tab === 'all' ? sampleImages : sampleImages.filter((_, i) => favorites[i]);
  const filteredImages = selectedCategory
    ? imagesByTab.filter(img => img.categories.includes(selectedCategory))
    : imagesByTab;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e1e2f, #2c2c54)",
        color: "#fff",
        px: 2,
        py: 4,
        textAlign: "center",
      }}
    >
      <Typography variant="h3" sx={{ mb: 2 }}>
        Tattoo Gallery
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{ mb: 4, maxWidth: 600, mx: "auto", color: "#ccc" }}
      >
        Browse through some popular tattoo ideas and styles for inspiration.
      </Typography>

      {/* Tabs for All / Favorites */}
      <Tabs
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
        centered
        sx={{ mb: 3 }}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="All" value="all" sx={{ color: '#fff' }} />
        <Tab label="Favorites" value="favorites" sx={{ color: '#fff' }} />
      </Tabs>

      {/* Category Selection */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4, flexWrap: 'wrap' }}>
        <Button
          variant={selectedCategory === null ? "contained" : "outlined"}
          onClick={() => setSelectedCategory(null)}
          sx={{ textTransform: "capitalize" }}
        >
          All
        </Button>
        {allCategories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "contained" : "outlined"}
            onClick={() => setSelectedCategory(cat)}
            sx={{ textTransform: "capitalize" }}
          >
            {cat}
          </Button>
        ))}
      </Stack>

      <Grid container spacing={4} justifyContent="center">
        {filteredImages.map((item, index) => {
          // Find the correct index in sampleImages for like/favorite state
          const realIndex = sampleImages.findIndex(img => img.url === item.url);
          return (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: 3,
                  backgroundColor: "#1e1e2f",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={item.url}
                  alt={`Tattoo ${index + 1}`}
                  sx={{ height: 300, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
                    Artist: {item.artist}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#ccc", mb: 2 }}>
                    Likes: {likes[realIndex]}
                  </Typography>

                  <Grid container spacing={2} justifyContent="center">
                    {/* Like Icon Button */}
                    <Grid>
                      <IconButton
                        onClick={() => toggleLike(realIndex)}
                        sx={{
                          color: liked[realIndex] ? "#f50057" : "#ccc",
                          "&:hover": {
                            backgroundColor: liked[realIndex] ? "#c51162" : "#9e9e9e",
                          },
                        }}
                      >
                        <ThumbUpIcon />
                      </IconButton>
                    </Grid>

                    {/* Favorite Icon Button */}
                    <Grid>
                      <IconButton
                        onClick={() => toggleFavorite(realIndex)}
                        sx={{
                          color: favorites[realIndex] ? "#ff9800" : "#ccc",
                          "&:hover": {
                            backgroundColor: favorites[realIndex]
                              ? "#f57c00"
                              : "#9e9e9e",
                          },
                        }}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </Grid>
                    {/* Download Icon Button */}
                    <Grid>
                      <IconButton
                        onClick={() => handleDownload(item.url, item.artist)}
                        sx={{
                          color: "#ccc",
                          "&:hover": {
                            backgroundColor: "#1976d2",
                            color: "#fff",
                          },
                        }}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default GalleryPage;
