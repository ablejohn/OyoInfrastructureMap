import React from "react";
import { Marker, Popup } from "react-leaflet";

const MapMarker = ({ item, handleMarkerClick }) => {
  return (
    <Marker
      key={item.id}
      position={[item.lat, item.lng]}
      eventHandlers={{
        click: () => handleMarkerClick(item.lat, item.lng, 13),
      }}
    >
      <Popup>
        <strong>{item.name}</strong>
        <br />
        Type: {item.type}
        <br />
        City: {item.city}
      </Popup>
    </Marker>
  );
};

export default MapMarker;
