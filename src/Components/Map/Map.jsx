import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import MapMarker from "./MapMarker";

// Update Leaflet icon options
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

const MapComponent = ({ mapCenter, mapZoom, filteredData, setMapCenter, setMapZoom }) => {
  const [mapInstance, setMapInstance] = useState(null);
  const mapRef = useRef();

  const handleMarkerClick = (lat, lng, zoom) => {
    setMapCenter([lat, lng]);
    setMapZoom(zoom);
  };

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      style={{ height: "500px" }}
      whenCreated={(map) => {
        setMapInstance(map);
        mapRef.current = map;
      }}
    >
      <ChangeView center={mapCenter} zoom={mapZoom} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {filteredData.map((item) => (
        <MapMarker
          key={item.id}
          item={item}
          handleMarkerClick={handleMarkerClick}
          map={mapInstance} // Pass map instance to MapMarker
        />
      ))}
    </MapContainer>
  );
};

export default MapComponent;
