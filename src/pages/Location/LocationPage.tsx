import { Box, Typography, Stack, Paper, CircularProgress } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { LatLngBounds, Map as LeafletMap, LeafletEvent } from "leaflet";

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Google Places API Place type (partial, for our use)
type Place = {
  place_id: string;
  name: string;
  vicinity: string;
  rating?: number;
  opening_hours?: { open_now: boolean };
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};

type UserLocation = { lat: number; lng: number };

function MapEventHandler({ onBoundsChange }: { onBoundsChange: (bounds: LatLngBounds) => void }) {
  useMapEvents({
    moveend: (e) => {
      const map = e.target as LeafletMap;
      const bounds = map.getBounds();
      onBoundsChange(bounds);
    },
    zoomend: (e) => {
      const map = e.target as LeafletMap;
      const bounds = map.getBounds();
      onBoundsChange(bounds);
    },
  });
  return null;
}

const LocationsPage = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [mapBounds, setMapBounds] = useState<LatLngBounds | null>(null);
  const [hoveredPlaceId, setHoveredPlaceId] = useState<string | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  // Get user location
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setLoading(false);
      },
      () => {
        setGeoError("Unable to retrieve your location.");
        setLoading(false);
      }
    );
  }, []);

  // Fetch places when map bounds change
  useEffect(() => {
    if (!mapBounds) return;
    setLoading(true);
    const sw = mapBounds.getSouthWest();
    const ne = mapBounds.getNorthEast();
    fetch(`/api/places-in-bounds?swLat=${sw.lat}&swLng=${sw.lng}&neLat=${ne.lat}&neLng=${ne.lng}`)
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data.results || []);
        setLoading(false);
      })
      .catch(() => {
        setGeoError("Failed to fetch places.");
        setLoading(false);
      });
  }, [mapBounds]);

  // Set initial bounds when user location is available
  useEffect(() => {
    if (userLocation && mapRef.current) {
      const map = mapRef.current;
      map.setView([userLocation.lat, userLocation.lng], 14);
      setMapBounds(map.getBounds());
    }
  }, [userLocation]);

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
        textAlign: "center",
        px: 2,
        py: 4,
      }}
    >
      <Typography variant="h3" sx={{ mb: 2 }}>
        Locations
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ mb: 4, maxWidth: 600, color: "#ccc" }}
      >
        Find the nearest tattoo studios in your area.
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        justifyContent="center"
        alignItems="stretch"
        sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}
      >
        {/* Map Section */}
        <Box
          sx={{
            flex: 1,
            minWidth: 320,
            maxWidth: 600,
            height: 400,
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 3,
          }}
        >
          {userLocation ? (
            <MapContainer
              center={[userLocation.lat, userLocation.lng]}
              zoom={14}
              style={{ width: "100%", height: "100%" }}
              whenReady={(event: LeafletEvent) => {
                const map = event.target as LeafletMap;
                mapRef.current = map;
                setMapBounds(map.getBounds());
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <MapEventHandler onBoundsChange={setMapBounds} />
              <Marker position={[userLocation.lat, userLocation.lng]} icon={defaultIcon}>
                <Popup>Your Location</Popup>
              </Marker>
              {places.map((place) => (
                <Marker
                  key={place.place_id}
                  position={[
                    place.geometry.location.lat,
                    place.geometry.location.lng,
                  ]}
                  icon={defaultIcon}
                  eventHandlers={{
                    mouseover: () => setHoveredPlaceId(place.place_id),
                    mouseout: () => setHoveredPlaceId(null),
                    click: () => setHoveredPlaceId(place.place_id),
                  }}
                >
                  <Popup>
                    <Typography variant="subtitle1" sx={{ color: "#90caf9" }}>
                      {place.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#ccc" }}>
                      {place.vicinity}
                    </Typography>
                    {place.rating && (
                      <Typography variant="body2" sx={{ color: "#ffd700" }}>
                        Rating: {place.rating} ⭐
                      </Typography>
                    )}
                    {place.opening_hours && (
                      <Typography variant="body2" sx={{ color: "#ccc" }}>
                        {place.opening_hours.open_now ? "Open now" : "Closed now"}
                      </Typography>
                    )}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress color="inherit" />
            </Box>
          )}
        </Box>
        {/* Info Section */}
        <Paper
          sx={{
            flex: 1,
            minWidth: 320,
            maxWidth: 600,
            height: 400,
            bgcolor: "#fff",
            color: "#23234a",
            borderRadius: 3,
            boxShadow: 3,
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            textAlign: "left",
            overflowY: "auto",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, color: "#23234a" }}>
            Tattoo Studios Nearby
          </Typography>
          {loading ? (
            <CircularProgress color="inherit" />
          ) : geoError ? (
            <Typography color="error">{geoError}</Typography>
          ) : places.length === 0 ? (
            <Typography>No locations found.</Typography>
          ) : (
            places.map((place, idx) => (
              <Box
                key={place.place_id || idx}
                onMouseEnter={() => setHoveredPlaceId(place.place_id)}
                onMouseLeave={() => setHoveredPlaceId(null)}
                sx={{
                  mb: 3,
                  pb: 2,
                  borderBottom: idx < places.length - 1 ? "1px solid #444" : "none",
                  background: hoveredPlaceId === place.place_id ? "#e3e8fa" : "transparent",
                  borderRadius: hoveredPlaceId === place.place_id ? 2 : 0,
                  transition: "background 0.2s",
                  cursor: "pointer",
                }}
              >
                <Typography variant="h6" sx={{ color: "#2c387e" }}>
                  {place.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#555" }}>
                  {place.vicinity}
                </Typography>
                {place.rating && (
                  <Typography variant="body2" sx={{ color: "#bfa100" }}>
                    Rating: {place.rating} ⭐
                  </Typography>
                )}
                {place.opening_hours && (
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    {place.opening_hours.open_now ? "Open now" : "Closed now"}
                  </Typography>
                )}
              </Box>
            ))
          )}
        </Paper>
      </Stack>
    </Box>
  );
};

export default LocationsPage;
