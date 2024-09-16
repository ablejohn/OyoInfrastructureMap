import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import MapMarker from "./MapMarker"; 

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom hook to update map view
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const MapComponent = ({
  mapCenter,
  mapZoom,
  filteredData,
  setMapCenter,
  setMapZoom,
}) => {
  const handleMarkerClick = (lat, lng, zoom) => {
    setMapCenter([lat, lng]);
    setMapZoom(zoom);
  };

  return (
    <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: "500px" }}>
      <ChangeView center={mapCenter} zoom={mapZoom} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {filteredData.map((item) => (
        <MapMarker
          key={item.id}
          item={item}
          handleMarkerClick={handleMarkerClick}
        />
      ))}
    </MapContainer>
  );
};

export default MapComponent;
