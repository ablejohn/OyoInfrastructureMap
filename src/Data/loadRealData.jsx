// src/data/loadRealData.js
import hospitalData from "./Hospital.json";
import schoolData from "./School.json";
import { generateId, assignMockCoordinates } from "../utils/dataUtils";

export const loadRealData = () => {
  const hospitals = hospitalData
    .map((item) => ({
      id: generateId(),
      name: item.hospital_name,
      type: "hospital",
      state: item.state,
      lga: item.lga,
      ownership: item.ownership,
      coordinates: assignMockCoordinates(item.state),
    }))
    .filter((item) => item.coordinates.lat && item.coordinates.lng); // Filter out invalid

  const schools = schoolData
    .map((item) => ({
      id: generateId(),
      name: item.school_name,
      type: "school",
      state: item.state,
      lga: item.lga,
      ownership: item.ownership,
      coordinates: assignMockCoordinates(item.state),
    }))
    .filter((item) => item.coordinates.lat && item.coordinates.lng); // Filter out invalid

  return [...hospitals, ...schools];
};
