// src/data/loadRealData.js
import hospitalData from "./Hospital.json";
import schoolData from "./School.json";
import { generateId, assignMockCoordinates } from "../utils/dataUtils";

export const loadRealData = () => {
  // Process hospitals
  const hospitals = hospitalData.map((item) => ({
    id: generateId(),
    name: item.hospital_name,
    type: "hospital",
    state: item.state,
    lga: item.lga,
    ownership: item.ownership,
    coordinates: assignMockCoordinates(item.state), // Assign mock coordinates
  }));

  // Process schools
  const schools = schoolData.map((item) => ({
    id: generateId(),
    name: item.school_name,
    type: "school",
    state: item.state,
    lga: item.lga,
    ownership: item.ownership,
    coordinates: assignMockCoordinates(item.state), // Assign mock coordinates
  }));

  // Combine all data into one array
  return [...hospitals, ...schools];
};
