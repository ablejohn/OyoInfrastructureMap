import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import MapMarker from "./MapMarker";
import { ButtonGroup } from "../UI/Button"; // Adjust if needed
import { loadRealData } from "../../Data/loadRealData";

const MapComponent = ({ mapCenter, mapZoom }) => {
  const [activeLayer, setActiveLayer] = useState("all");
  const [viewMode, setViewMode] = useState("markers");
  const [filteredData, setFilteredData] = useState([]);

  // Load real data when component mounts
  useEffect(() => {
    const data = loadRealData();
    setFilteredData(data);
  }, []);

  const MapController = () => {
    const map = useMap();
    useEffect(() => {
      map.setView(mapCenter, mapZoom);
    }, [mapCenter, mapZoom]);
    return null;
  };

  const filteredMarkers = filteredData.filter(
    (item) => activeLayer === "all" || item.type === activeLayer
  );

  const renderMarkers = () => {
    const markers = filteredMarkers.map((item) => (
      <MapMarker
        key={item.id}
        position={[item.coordinates.lat, item.coordinates.lng]}
        name={item.name}
        type={item.type}
      />
    ));

    return viewMode === "cluster" ? (
      <MarkerClusterGroup>{markers}</MarkerClusterGroup>
    ) : (
      markers
    );
  };

  return (
    <div style={{ height: "600px", width: "100%" }}>
      <div style={{ marginBottom: "10px" }}>
        <ButtonGroup
          activeLayer={activeLayer}
          setActiveLayer={setActiveLayer}
        />
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="markers">Markers</option>
          <option value="cluster">Clustered</option>
        </select>
      </div>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <MapController />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomControl position="bottomright" />
        {renderMarkers()}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
