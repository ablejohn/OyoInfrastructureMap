import React, { useRef } from "react";
import { Marker, Popup } from "react-leaflet";

const MapMarker = ({ item, handleMarkerClick, map }) => {
  const popupRef = useRef();

  const handlePopupClose = () => {
    // Check if map instance is available
    if (map) {
      // Zoom out to a lower level (e.g., zoom level 8)
      map.setZoom(8);
    }
  };

  return (
    <Marker
      key={item.id}
      position={[item.lat, item.lng]}
      eventHandlers={{
        click: () => {
          handleMarkerClick(item.lat, item.lng, 13);
          // Open the popup and attach close event handler
          if (popupRef.current) {
            popupRef.current.openOn(map);
          }
        },
      }}
    >
      <Popup
        ref={popupRef}
        onClose={handlePopupClose}
      >
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
