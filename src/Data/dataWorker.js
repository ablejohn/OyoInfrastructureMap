import hospitalsData from "./Hospital.json";
import schoolsData from "./School.json";

// List of major cities with their coordinates
const majorCities = [
  { name: "Lagos", state: "Lagos", lat: 6.5244, lng: 3.3792 },
  { name: "Kano", state: "Kano", lat: 12.0022, lng: 8.592 },
  { name: "Ibadan", state: "Oyo", lat: 7.3775, lng: 3.947 },
  { name: "Abuja", state: "FCT", lat: 9.0765, lng: 7.3986 },
  { name: "Port Harcourt", state: "Rivers", lat: 4.8156, lng: 7.0498 },
  { name: "Benin City", state: "Edo", lat: 6.335, lng: 5.6037 },
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

// Function to add a random offset to coordinates to avoid overlap
const getRandomOffset = () => (Math.random() - 0.5) * 0.5;

// Get city coordinates based on state
const getCityCoordinates = (state) => {
  const city = majorCities.find(
    (city) => city.state.toLowerCase() === state.toLowerCase()
  );
  if (city) {
    return {
      lat: city.lat + getRandomOffset(),
      lng: city.lng + getRandomOffset(),
    };
  }
  // Default coordinates for Abuja if city not found
  return { lat: 9.0765 + getRandomOffset(), lng: 7.3986 + getRandomOffset() };
};

// Utility function to convert strings to lowercase
const toLowerCase = (value) =>
  typeof value === "string" ? value.toLowerCase() : "";

// Process a chunk of data for either schools or hospitals
const processDataChunk = (data, startIndex, chunkSize, isSchool) => {
  return data.slice(startIndex, startIndex + chunkSize).map((item, index) => {
    const coords = getCityCoordinates(isSchool ? item.state : item.State);
    return {
      id: `${isSchool ? "school" : "hospital"}_${startIndex + index}`,
      type: isSchool ? "school" : "hospital",
      name: isSchool
        ? toLowerCase(item.school_name)
        : toLowerCase(item["Facility Name"]),
      state: toLowerCase(isSchool ? item.state : item.State),
      lga: toLowerCase(isSchool ? item.lga : item.LGA),
      town: isSchool ? toLowerCase(item.town) : "",
      ownership: toLowerCase(isSchool ? item.ownership : item.Ownership),
      lat: coords.lat,
      lng: coords.lng,
    };
  });
};

self.addEventListener("message", async (e) => {
  const { activeLayer, pageSize, maxItems } = e.data;
  let processedData = [];
  let totalProcessed = 0;

  const processChunk = async (data, isSchool) => {
    for (
      let i = 0;
      i < data.length && totalProcessed < maxItems;
      i += pageSize
    ) {
      const chunk = processDataChunk(
        data,
        i,
        Math.min(pageSize, maxItems - totalProcessed),
        isSchool
      );
      processedData = [...processedData, ...chunk];
      totalProcessed += chunk.length;
      self.postMessage({ type: "progress", count: totalProcessed });
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  };

  if (activeLayer === "school" || activeLayer === "all") {
    const publicSchools = schoolsData.filter(
      (school) => toLowerCase(school.ownership) !== "private proprietor"
    );
    await processChunk(publicSchools, true);
  }

  if (
    (activeLayer === "hospital" || activeLayer === "all") &&
    totalProcessed < maxItems
  ) {
    await processChunk(hospitalsData, false);
  }

  self.postMessage({ type: "complete", data: processedData });
});
