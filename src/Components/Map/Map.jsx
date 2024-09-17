import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icon creation function
const createCustomIcon = (type) => {
  const iconUrl =
    type === "hospital"
      ? "https://cdn-icons-png.flaticon.com/512/3448/3448513.png"
      : "https://cdn-icons-png.flaticon.com/512/2602/2602414.png";

  return new L.Icon({
    iconUrl: iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const MapComponent = ({
  mapCenter,
  mapZoom,
  filteredData,
  setMapCenter,
  setMapZoom,
}) => {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleMarkerClick = (item) => {
    setMapCenter([item.lat, item.lng]);
    setMapZoom(15);
    setActiveMarker(item);
  };

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
        <ChangeView center={mapCenter} zoom={mapZoom} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {filteredData.map((item) => (
          <Marker
            key={item.id}
            position={[item.lat, item.lng]}
            icon={createCustomIcon(item.type)}
            eventHandlers={{
              click: () => handleMarkerClick(item),
            }}
          >
            <Popup>
              <div style={{ fontFamily: "Arial, sans-serif", padding: "10px" }}>
                <h3
                  style={{
                    margin: "0 0 10px 0",
                    color: item.type === "hospital" ? "#e74c3c" : "#3498db",
                  }}
                >
                  {item.name}
                </h3>
                <p style={{ margin: "5px 0" }}>
                  <strong>Type:</strong> {item.type}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>City:</strong> {item.city}
                </p>
              </div>
            </Popup>
          </Marker>
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
        }}
      >
        <h2
          style={{ margin: "0 0 10px 0", fontSize: "18px", color: "#2c3e50" }}
        >
          Infrastructure Map
        </h2>
        <p style={{ margin: "5px 0", fontSize: "14px", color: "#34495e" }}>
          Total Items: {filteredData.length}
        </p>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3448/3448513.png"
            alt="Hospital"
            style={{ width: "20px", marginRight: "5px" }}
          />
          <span style={{ fontSize: "14px", color: "#34495e" }}>Hospital</span>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2602/2602414.png"
            alt="School"
            style={{ width: "20px", marginLeft: "15px", marginRight: "5px" }}
          />
          <span style={{ fontSize: "14px", color: "#34495e" }}>School</span>
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
          }}
        >
          <h3
            style={{
              margin: "0 0 10px 0",
              fontSize: "16px",
              color: activeMarker.type === "hospital" ? "#e74c3c" : "#3498db",
            }}
          >
            {activeMarker.name}
          </h3>
          <p style={{ margin: "5px 0", fontSize: "14px", color: "#34495e" }}>
            <strong>Type:</strong> {activeMarker.type}
          </p>
          <p style={{ margin: "5px 0", fontSize: "14px", color: "#34495e" }}>
            <strong>City:</strong> {activeMarker.city}
          </p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
