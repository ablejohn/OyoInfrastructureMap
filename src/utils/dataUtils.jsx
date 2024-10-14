// src/utils/dataUtils.js
export const generateId = () => Math.random().toString(36).substr(2, 9);

export const assignMockCoordinates = (state) => {
  // Placeholder coordinates for each state (example only)
  const stateCoordinates = {
    abia: { lat: 5.532, lng: 7.486 },
    lagos: { lat: 6.524, lng: 3.379 },
    kano: { lat: 12.0022, lng: 8.5919 },
    // Add more states as needed...
  };
  return stateCoordinates[state.toLowerCase()] || { lat: 0, lng: 0 }; // Default to {0,0}
};
