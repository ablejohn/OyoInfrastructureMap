import hospitalsData from "./Hospitals.json";
import schoolsData from "./Schools.json";

const getRandomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const generateMockData = () => {
  const schools = schoolsData
    .map((school, index) => ({
      id: `school_${index}`,
      type: "school",
      name: school.name,
      lat:
        school.lat !== undefined
          ? parseFloat(school.lat)
          : getRandomInRange(7.0, 9.0),
      lng:
        school.lng !== undefined
          ? parseFloat(school.lng)
          : getRandomInRange(3.0, 5.0),
      lga: school.lga || "Unknown",
    }))
    .filter((school) => !isNaN(school.lat) && !isNaN(school.lng));

  const hospitals = hospitalsData
    .map((hospital, index) => ({
      id: `hospital_${index}`,
      type: "hospital",
      name: hospital.name,
      lat:
        hospital.lat !== undefined
          ? parseFloat(hospital.lat)
          : getRandomInRange(7.0, 9.0),
      lng:
        hospital.lng !== undefined
          ? parseFloat(hospital.lng)
          : getRandomInRange(3.0, 5.0),
      lga: hospital.lga || "Unknown",
      geolocationcordinates: hospital.geolocationcordinates || "Not available",
    }))
    .filter((hospital) => !isNaN(hospital.lat) && !isNaN(hospital.lng));

  console.log("Processed Schools:", schools.length);
  console.log("Processed Hospitals:", hospitals.length);
  console.log("Sample Hospital:", hospitals[0]);

  return [...schools, ...hospitals];
};

export const majorCities = [
  { name: "Ibadan", lat: 7.3775, lng: 3.947, population: 3565108 },
  { name: "Ogbomosho", lat: 8.1333, lng: 4.2567, population: 433030 },
  { name: "Oyo", lat: 7.85, lng: 3.9333, population: 736072 },
  { name: "Iseyin", lat: 7.9667, lng: 3.6, population: 387592 },
  { name: "Saki", lat: 8.6667, lng: 3.3833, population: 178677 },
];
