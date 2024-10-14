// src/Components/Map/MapMarker.jsx
import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Define icons for different types of infrastructure
const markerIcons = {
  hospital: L.icon({
    iconUrl: "/icons/hospital-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  school: L.icon({
    iconUrl: "/icons/school-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  default: L.icon({
    iconUrl: "/icons/default-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
};

const MapMarker = ({ item, handleMarkerClick }) => {
  console.log("Rendering marker for:", item);

  // Extract coordinates and properties from the item
  const { coordinates, name, type } = item;

  // Ensure coordinates are valid
  if (
    !coordinates ||
    coordinates.lat === undefined ||
    coordinates.lng === undefined
  ) {
    console.error("Invalid coordinates for item:", item);
    return null;
  }

  // Use appropriate icon based on item type
  const icon = markerIcons[type] || markerIcons.default;

  return (
    <Marker
      position={[coordinates.lat, coordinates.lng]}
      icon={icon}
      eventHandlers={{
        click: () => handleMarkerClick(item),
      }}
    >
      <Popup>
        <div>
          <h3>{name}</h3>
          <p>Type: {type}</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
