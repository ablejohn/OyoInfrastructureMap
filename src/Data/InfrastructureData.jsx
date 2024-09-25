import hospitalsData from "./Hospitals.json";
import schoolsData from "./Schools.json";

// Approximate boundaries for Oyo State
const OYO_STATE_BOUNDS = {
  minLat: 7.0,
  maxLat: 9.0,
  minLng: 2.7,
  maxLng: 4.6,
};

const isWithinOyoState = (lat, lng) => {
  return (
    lat >= OYO_STATE_BOUNDS.minLat &&
    lat <= OYO_STATE_BOUNDS.maxLat &&
    lng >= OYO_STATE_BOUNDS.minLng &&
    lng <= OYO_STATE_BOUNDS.maxLng
  );
};

const getRandomCoordinateInOyo = () => {
  const lat =
    Math.random() * (OYO_STATE_BOUNDS.maxLat - OYO_STATE_BOUNDS.minLat) +
    OYO_STATE_BOUNDS.minLat;
  const lng =
    Math.random() * (OYO_STATE_BOUNDS.maxLng - OYO_STATE_BOUNDS.minLng) +
    OYO_STATE_BOUNDS.minLng;
  return { lat, lng };
};

export const generateMockData = () => {
  const schools = schoolsData
    .map((school, index) => {
      let lat = school.lat !== undefined ? parseFloat(school.lat) : null;
      let lng = school.lng !== undefined ? parseFloat(school.lng) : null;

      if (lat === null || lng === null || !isWithinOyoState(lat, lng)) {
        const newCoords = getRandomCoordinateInOyo();
        lat = newCoords.lat;
        lng = newCoords.lng;
      }

      return {
        id: `school_${index}`,
        type: "school",
        name: school.name,
        lat,
        lng,
        lga: school.lga || "Unknown",
      };
    })
    .filter((school) => !isNaN(school.lat) && !isNaN(school.lng));

  const hospitals = hospitalsData
    .map((hospital) => {
      let lat = parseFloat(hospital.latitude);
      let lng = parseFloat(hospital.longitude);

      if (!isWithinOyoState(lat, lng)) {
        const newCoords = getRandomCoordinateInOyo();
        lat = newCoords.lat;
        lng = newCoords.lng;
      }

      return {
        id: `hospital_${hospital.id}`,
        type: "hospital",
        name: hospital.name,
        lat,
        lng,
        lga: hospital.lga || "Unknown",
      };
    })
    .filter((hospital) => !isNaN(hospital.lat) && !isNaN(hospital.lng));

  console.log("Processed Schools:", schools.length);
  console.log("Processed Hospitals:", hospitals.length);
  console.log("Sample Hospital:", hospitals[0]);
  console.log("Sample School:", schools[0]);

  return [...schools, ...hospitals];
};

export const majorCities = [
  { name: "Ibadan", lat: 7.3775, lng: 3.947, population: 3565108 },
  { name: "Ogbomosho", lat: 8.1333, lng: 4.2567, population: 433030 },
  { name: "Oyo", lat: 7.85, lng: 3.9333, population: 736072 },
  { name: "Iseyin", lat: 7.9667, lng: 3.6, population: 387592 },
  { name: "Saki", lat: 8.6667, lng: 3.3833, population: 178677 },
];
