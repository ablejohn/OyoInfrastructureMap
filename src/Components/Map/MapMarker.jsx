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

  const getMarkerIcon = (type) => {
    switch (type) {
      case "hospital":
        return "🏥"; // Unicode for hospital
      case "school":
        return "🏫"; // Unicode for school
      case "road":
        return "🛣"; // Unicode for road
      default:
        return "📍"; // Default map marker icon
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
          ${getMarkerIcon(item.type)}
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
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
            <strong>lga:</strong> {item.lga}
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
