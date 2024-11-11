import React from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const USVisitorsMap = () => {
  const visitors = [
    { id: 1, lat: 40.7128, lng: -74.006, city: "New York" },
    { id: 2, lat: 44.5, lng: -69.0, city: "Maine" },
    { id: 3, lat: 42.3601, lng: -83.0, city: "Michigan" },
    { id: 4, lat: 41.8781, lng: -87.6298, city: "Chicago" },
    { id: 5, lat: 37.7749, lng: -122.4194, city: "San Francisco" },
    { id: 6, lat: 39.0, lng: -105.5, city: "Colorado" },
    { id: 7, lat: 30.0, lng: -82.0, city: "Florida" },
  ];

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1a1b2e",
        borderRadius: "10px",
        maxWidth: "800px",
      }}
    >
      <h2 style={{ color: "#fff", marginBottom: "20px" }}>
        Current US visitors
      </h2>
      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        style={{ height: "500px", width: "100%", backgroundColor: "#1a1b2e" }}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

        {visitors.map((visitor) => (
          <CircleMarker
            key={visitor.id}
            center={[visitor.lat, visitor.lng]}
            radius={6}
            pathOptions={{
              fillColor: "#40CFFF",
              fillOpacity: 0.7,
              color: "#40CFFF",
              weight: 2,
            }}
          >
            <Tooltip>{visitor.city}</Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default USVisitorsMap;
