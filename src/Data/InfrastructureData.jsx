import hospitalsData from "./Hospital.json";
import schoolsData from "./School.json";

// Approximate boundaries for Nigeria
const NIGERIA_BOUNDS = {
  minLat: 4.0,
  maxLat: 14.0,
  minLng: 3.0,
  maxLng: 15.0,
};

// Function to check if a coordinate is within Nigeria
const isWithinNigeria = (lat, lng) => {
  return (
    lat >= NIGERIA_BOUNDS.minLat &&
    lat <= NIGERIA_BOUNDS.maxLat &&
    lng >= NIGERIA_BOUNDS.minLng &&
    lng <= NIGERIA_BOUNDS.maxLng
  );
};

// Generate mock data with random coordinates for missing or invalid lat/lng
const generateMockData = () => {
  const schools = schoolsData.map((school, index) => {
    let lat = school.lat !== undefined ? parseFloat(school.lat) : null;
    let lng = school.lng !== undefined ? parseFloat(school.lng) : null;

    if (lat === null || lng === null || !isWithinNigeria(lat, lng)) {
      lat = Math.random() * (NIGERIA_BOUNDS.maxLat - NIGERIA_BOUNDS.minLat) + NIGERIA_BOUNDS.minLat;
      lng = Math.random() * (NIGERIA_BOUNDS.maxLng - NIGERIA_BOUNDS.minLng) + NIGERIA_BOUNDS.minLng;
    }

    return {
      id: `school_${index}`,
      type: "school",
      name: school.name,
      lat,
      lng,
      lga: school.lga || "Unknown",
    };
  });

  const hospitals = hospitalsData.map((hospital, index) => {
    let lat = parseFloat(hospital.latitude);
    let lng = parseFloat(hospital.longitude);

    if (!isWithinNigeria(lat, lng)) {
      lat = Math.random() * (NIGERIA_BOUNDS.maxLat - NIGERIA_BOUNDS.minLat) + NIGERIA_BOUNDS.minLat;
      lng = Math.random() * (NIGERIA_BOUNDS.maxLng - NIGERIA_BOUNDS.minLng) + NIGERIA_BOUNDS.minLng;
    }

    return {
      id: `hospital_${index}`,
      type: "hospital",
      name: hospital.name,
      lat,
      lng,
      lga: hospital.lga || "Unknown",
    };
  });

  return [...schools, ...hospitals];
};

// Function to load and paginate data
export const loadInfrastructureData = async (offset = 0, limit = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allData = generateMockData();
      const paginatedData = allData.slice(offset, offset + limit);
      resolve(paginatedData);
    }, 1000); // Simulate network delay
  });
};

// Export major cities in Nigeria
export const majorCities = [
  { name: "Lagos", state: "Lagos", lat: 6.5244, lng: 3.3792 },
  { name: "Kano", state: "Kano", lat: 12.0022, lng: 8.5919 },
  { name: "Ibadan", state: "Oyo", lat: 7.3775, lng: 3.947 },
  { name: "Abuja", state: "FCT", lat: 9.0578, lng: 7.49508 },
  { name: "Port Harcourt", state: "Rivers", lat: 4.8154, lng: 7.0491 },
  { name: "Benin City", state: "Edo", lat: 6.3326, lng: 5.603 },
  { name: "Maiduguri", state: "Borno", lat: 11.8469, lng: 13.1569 },
  { name: "Zaria", state: "Kaduna", lat: 11.111, lng: 7.7227 },
  { name: "Aba", state: "Abia", lat: 5.106, lng: 7.3667 },
  { name: "Jos", state: "Plateau", lat: 9.8965, lng: 8.8583 },
  { name: "Ilorin", state: "Kwara", lat: 8.5, lng: 4.55 },
  { name: "Oyo", state: "Oyo", lat: 7.85, lng: 3.9333 },
  { name: "Enugu", state: "Enugu", lat: 6.45, lng: 7.5 },
  { name: "Abeokuta", state: "Ogun", lat: 7.15, lng: 3.35 },
  { name: "Onitsha", state: "Anambra", lat: 6.1667, lng: 6.7833 },
  { name: "Warri", state: "Delta", lat: 5.5167, lng: 5.75 },
  { name: "Sokoto", state: "Sokoto", lat: 13.0622, lng: 5.2339 },
  { name: "Okene", state: "Kogi", lat: 7.55, lng: 6.2333 },
  { name: "Calabar", state: "Cross River", lat: 4.95, lng: 8.325 },
  { name: "Oshogbo", state: "Osun", lat: 7.7667, lng: 4.5667 },
  { name: "Katsina", state: "Katsina", lat: 12.985, lng: 7.6 },
  { name: "Akure", state: "Ondo", lat: 7.25, lng: 5.195 },
];
