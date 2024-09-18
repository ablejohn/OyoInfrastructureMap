import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapMarker from "./MapMarker";

// Function to return marker icons based on type
const getMarkerIcon = (type) => {
  switch (type) {
    case "hospital":
      return "🏥"; // Unicode for hospital
    case "school":
      return "🏫"; // Unicode for school
    case "road":
      return "🛣"; // Unicode for road
    default:
      return "📍"; // Default map marker icon
  }
};

function MapComponent({
  mapCenter,
  mapZoom,
  filteredData,
  setMapCenter,
  setMapZoom,
}) {
  const [activeMarker, setActiveMarker] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(mapZoom);

  const handleMarkerClick = (item) => {
    setMapCenter([item.lat, item.lng]);
    setMapZoom(15);
    setActiveMarker(item);
  };

  const fontSize =
    currentZoom > 12 ? "16px" : currentZoom > 10 ? "14px" : "12px";
  const headingSize =
    currentZoom > 12 ? "18px" : currentZoom > 10 ? "16px" : "14px";

  return (
    <div
      className="map-container"
      style={{
        position: "relative",
        height: "600px",
        width: "100%",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      }}
    >
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {filteredData.map((item) => (
          <MapMarker key={item.id} item={item} onClick={handleMarkerClick} />
        ))}
      </MapContainer>

      {/* Information Panel */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          maxWidth: "300px",
          zIndex: 1000,
          fontSize: fontSize,
        }}
      >
        <h2
          style={{
            margin: "0 0 10px 0",
            fontSize: headingSize,
            color: "#2c3e50",
          }}
        >
          Infrastructure Map
        </h2>
        <p style={{ margin: "5px 0", fontSize: fontSize, color: "#34495e" }}>
          Total Items: {filteredData.length}
        </p>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <span style={{ fontSize: fontSize, marginRight: "15px" }}>
            {getMarkerIcon("hospital")}
          </span>
          <span style={{ fontSize: fontSize, color: "#34495e" }}>Hospital</span>
          <span style={{ fontSize: fontSize, marginLeft: "15px" }}>
            {getMarkerIcon("school")}
          </span>
          <span style={{ fontSize: fontSize, color: "#34495e" }}>School</span>
        </div>
      </div>

      {/* Active Marker Info */}
      {activeMarker && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            maxWidth: "300px",
            zIndex: 1000,
            fontSize: fontSize,
          }}
        >
          <h3
            style={{
              margin: "0 0 10px 0",
              fontSize: headingSize,
              color: activeMarker.type === "hospital" ? "#e74c3c" : "#3498db",
            }}
          >
            {activeMarker.name}
          </h3>
          <p style={{ margin: "5px 0", fontSize: fontSize, color: "#34495e" }}>
            <strong>Type:</strong> {activeMarker.type}
          </p>
          <p style={{ margin: "5px 0", fontSize: fontSize, color: "#34495e" }}>
            <strong>City:</strong> {activeMarker.city}
          </p>
        </div>
      )}
    </div>
  );
}

export default MapComponent;
