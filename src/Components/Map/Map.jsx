import React, { useState, useEffect, useMemo, Suspense } from "react";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { ButtonGroup } from "../UI/Button";
import { loadRealData } from "../../Data/loadRealData";
import MapMarker from "./MapMarker";

const DEFAULT_CENTER = [9.082, 8.6753];
const DEFAULT_ZOOM = 6;

const MapComponent = ({
  mapCenter = DEFAULT_CENTER,
  mapZoom = DEFAULT_ZOOM,
}) => {
  const [activeLayer, setActiveLayer] = useState("all");
  const [viewMode, setViewMode] = useState("markers");
  const [filteredData, setFilteredData] = useState([]);

  // Load data once when the component mounts
  useEffect(() => {
    const data = loadRealData();
    console.log("Loaded data:", data);
    setFilteredData(data);
  }, []);

  const MapController = () => {
    const map = useMap();
    useEffect(() => {
      map.setView(mapCenter, mapZoom);
    }, [mapCenter, mapZoom, map]);
    return null;
  };

  const filteredMarkers = useMemo(() => {
    const filtered = filteredData.filter(
      (item) => activeLayer === "all" || item.type === activeLayer
    );
    console.log("Filtered markers:", filtered);
    return filtered;
  }, [filteredData, activeLayer]);

  const renderMarkers = useMemo(
    () =>
      filteredMarkers.map((item) => <MapMarker key={item.id} item={item} />),
    [filteredMarkers]
  );

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

        <Suspense fallback={<div>Loading markers...</div>}>
          {viewMode === "cluster" ? (
            <MarkerClusterGroup>{renderMarkers}</MarkerClusterGroup>
          ) : (
            renderMarkers
          )}
        </Suspense>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
