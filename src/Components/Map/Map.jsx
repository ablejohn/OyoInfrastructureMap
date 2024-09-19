import React, { useState, useMemo } from "react";
import { MapContainer, TileLayer, ZoomControl, Circle } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import MapMarker from "./MapMarker";

const MARKER_ICONS = {
  hospital: "🏥",
  school: "🏫",
  road: "🛣",
  default: "📍"
};

const MapComponent = ({ mapCenter, mapZoom, filteredData, setMapCenter, setMapZoom }) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [viewMode, setViewMode] = useState('markers'); // 'markers', 'cluster', or 'heatmap'

  const handleMarkerClick = (item) => {
    setMapCenter([item.lat, item.lng]);
    setMapZoom(15);
    setActiveMarker(item);
  };

  const mapStyle = {
    height: "600px",
    width: "100%",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  };

  const panelStyle = {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    zIndex: 1000,
  };

  const renderMarkers = () => {
    switch (viewMode) {
      case 'cluster':
        return (
          <MarkerClusterGroup>
            {filteredData.map((item) => (
              <MapMarker key={item.id} item={item} onClick={handleMarkerClick} />
            ))}
          </MarkerClusterGroup>
        );
      case 'heatmap':
        return filteredData.map((item) => (
          <Circle
            key={item.id}
            center={[item.lat, item.lng]}
            pathOptions={{ fillColor: 'red', fillOpacity: 0.5, stroke: false }}
            radius={500}
          />
        ));
      default:
        return filteredData.map((item) => (
          <MapMarker key={item.id} item={item} onClick={handleMarkerClick} />
        ));
    }
  };

  return (
    <div style={{ position: "relative", ...mapStyle }}>
      <MapContainer center={mapCenter} zoom={mapZoom} style={mapStyle} zoomControl={false}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <ZoomControl position="bottomright" />
        {renderMarkers()}
      </MapContainer>

      {/* Info Panel */}
      <div style={{ ...panelStyle, top: "20px", left: "20px", maxWidth: "300px" }}>
        <h2 style={{ margin: "0 0 10px 0", fontSize: "18px", color: "#2c3e50" }}>
          Infrastructure Map
        </h2>
        <p style={{ margin: "5px 0", fontSize: "14px", color: "#34495e" }}>
          Total Items: {filteredData.length}
        </p>
        <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
          {Object.entries(MARKER_ICONS).map(([type, icon]) => (
            <div key={type} style={{ marginRight: "15px" }}>
              <span style={{ fontSize: "16px", marginRight: "5px" }}>{icon}</span>
              <span style={{ fontSize: "14px", color: "#34495e" }}>{type}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "15px" }}>
          <select 
            value={viewMode} 
            onChange={(e) => setViewMode(e.target.value)}
            style={{ padding: "5px", borderRadius: "5px", width: "100%" }}
          >
            <option value="markers">Markers</option>
            <option value="cluster">Clustered</option>
            <option value="heatmap">Density View</option>
          </select>
        </div>
      </div>

      {/* Active Marker Info */}
      {activeMarker && (
        <div style={{ ...panelStyle, bottom: "20px", left: "20px", maxWidth: "300px" }}>
          <h3 style={{ 
            margin: "0 0 10px 0", 
            fontSize: "16px", 
            color: activeMarker.type === "hospital" ? "#e74c3c" : "#3498db" 
          }}>
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