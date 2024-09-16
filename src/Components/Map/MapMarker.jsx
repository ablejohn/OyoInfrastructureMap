import React, { useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const MapMarker = ({ item, handleMarkerClick, map }) => {
  const popupRef = useRef();

  const handlePopupClose = () => {
    if (map) {
      map.setZoom(8);
    }
  };

  // Create a custom icon with different colors based on the type
  const customIcon = L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${
      item.type === "hospital" ? "red" : "green"
    }; 
                       width: 30px; 
                       height: 30px; 
                       border-radius: 50%; 
                       border: 2px solid white;">
           </div>`,
    iconSize: [15, 15],
    iconAnchor: [7, 7],
  });

  return (
    <Marker
      key={item.id}
      position={[item.lat, item.lng]}
      icon={customIcon}
      eventHandlers={{
        click: () => {
          handleMarkerClick(item.lat, item.lng, 13);
          if (popupRef.current) {
            popupRef.current.openOn(map);
          }
        },
      }}
    >
      <Popup ref={popupRef} onClose={handlePopupClose}>
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
