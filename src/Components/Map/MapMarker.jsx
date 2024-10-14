import React, { useRef, useMemo } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const MapMarker = ({ item, handleMarkerClick, map }) => {
  const popupRef = useRef();

  // Ensure item has all necessary properties
  if (
    !item ||
    typeof item !== "object" ||
    !item.lat ||
    !item.lng ||
    !item.type
  ) {
    console.error("Invalid item prop passed to MapMarker:", item);
    return null;
  }

  const { lat, lng, type, name, lga, state } = item;

  const handlePopupClose = () => {
    if (map) {
      map.setZoom(8);
    }
  };

  const getMarkerIcon = (type) => {
    switch (type.toLowerCase()) {
      case "hospital":
        return "🏥";
      case "school":
        return "🏫";
      case "road":
        return "🛣";
      default:
        return "📍";
    }
  };

  const getMarkerColor = (type) => {
    switch (type.toLowerCase()) {
      case "hospital":
        return "#FF4136";
      case "school":
        return "#2ECC40";
      case "road":
        return "#0074D9";
      default:
        return "#FF851B";
    }
  };

  const customIcon = useMemo(() => {
    return L.divIcon({
      className: "custom-div-icon",
      html: `
        <div style="
          background-color: ${getMarkerColor(type)};
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 18px;
        ">
          ${getMarkerIcon(type)}
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
  }, [type]);

  return (
    <Marker
      position={[lat, lng]}
      icon={customIcon}
      eventHandlers={{
        click: () => {
          handleMarkerClick(item);
          if (popupRef.current && map) {
            popupRef.current.openOn(map);
          }
        },
      }}
    >
      <Popup ref={popupRef} onClose={handlePopupClose}>
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: "14px" }}>
          <h3 style={{ margin: "0 0 10px 0", color: getMarkerColor(type) }}>
            {name}
          </h3>
          <p>
            <strong>Type:</strong>{" "}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </p>
          <p>
            <strong>LGA:</strong> {lga || "Not available"}
          </p>
          <p>
            <strong>State:</strong> {state || "Not available"}
          </p>
          <p>
            <strong>Coordinates:</strong> {parseFloat(lat).toFixed(6)},{" "}
            {parseFloat(lng).toFixed(6)}
          </p>
        </div>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
