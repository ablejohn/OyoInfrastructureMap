import React, { useRef, useMemo } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const MapMarker = ({ item, handleMarkerClick, map }) => {
  const popupRef = useRef();

  const handlePopupClose = () => {
    if (map) {
      map.setZoom(8);
    }
  };

  const getMarkerColor = (type) => {
    switch (type) {
      case "hospital":
        return "#FF4136"; // A more vibrant red
      case "school":
        return "#2ECC40"; // A more vibrant green
      case "road":
        return "#0074D9"; // A vibrant blue
      default:
        return "#FF851B"; // Orange for other types
    }
  };

  const customIcon = useMemo(() => {
    return L.divIcon({
      className: "custom-div-icon",
      html: `
        <div style="
          background-color: ${getMarkerColor(item.type)};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
        ">
          ${item.type.charAt(0).toUpperCase()}
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    });
  }, [item.type]);

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
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: "14px" }}>
          <h3
            style={{ margin: "0 0 10px 0", color: getMarkerColor(item.type) }}
          >
            {item.name}
          </h3>
          <p>
            <strong>Type:</strong>{" "}
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </p>
          <p>
            <strong>City:</strong> {item.city}
          </p>
          <p>
            <strong>Coordinates:</strong>{" "}
            {item.geolocationcordinates || "Not available"}
          </p>
        </div>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
