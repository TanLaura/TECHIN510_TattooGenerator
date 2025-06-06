require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint: /api/places?lat=...&lng=...
app.get('/api/places', async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing lat or lng' });
  }

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        key: process.env.GOOGLE_MAPS_API_KEY,
        location: `${lat},${lng}`,
        radius: 5000, // meters
        type: 'tattoo_parlor'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch places' });
  }
});

// Endpoint: /api/places-in-bounds?swLat=...&swLng=...&neLat=...&neLng=...
app.get('/api/places-in-bounds', async (req, res) => {
  const { swLat, swLng, neLat, neLng } = req.query;
  if (!swLat || !swLng || !neLat || !neLng) {
    return res.status(400).json({ error: 'Missing bounds parameters' });
  }

  // Calculate center and radius for Google Places API
  const centerLat = (parseFloat(swLat) + parseFloat(neLat)) / 2;
  const centerLng = (parseFloat(swLng) + parseFloat(neLng)) / 2;
  // Approximate radius in meters (not perfect, but works for small areas)
  const R = 6371e3; // Earth radius in meters
  const dLat = (parseFloat(neLat) - parseFloat(swLat)) * Math.PI / 180;
  const dLng = (parseFloat(neLng) - parseFloat(swLng)) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(parseFloat(swLat) * Math.PI / 180) * Math.cos(parseFloat(neLat) * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const radius = Math.min(50000, R * c / 2); // Cap at 50km for API limit

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        key: process.env.GOOGLE_MAPS_API_KEY,
        location: `${centerLat},${centerLng}`,
        radius,
        keyword: 'tattoo'
      }
    });
    // Optionally filter results to only those within the bounds
    const results = (response.data.results || []).filter(place => {
      const lat = place.geometry.location.lat;
      const lng = place.geometry.location.lng;
      return lat >= parseFloat(swLat) && lat <= parseFloat(neLat) &&
             lng >= parseFloat(swLng) && lng <= parseFloat(neLng);
    });
    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch places' });
  }
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.post('/api/generate-tattoo', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const openaiRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a creative tattoo designer.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 200,
        temperature: 0.9,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    const idea = openaiRes.data.choices?.[0]?.message?.content?.trim() || 'No idea generated.';
    res.status(200).json({ idea });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate tattoo idea.' });
  }
});

app.post('/api/generate-tattoo-image', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const openaiRes = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: prompt,
        n: 1,
        size: "512x512"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    const imageUrl = openaiRes.data.data?.[0]?.url;
    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate tattoo image.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});