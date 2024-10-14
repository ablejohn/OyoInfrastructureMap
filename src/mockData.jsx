import mockHospitalData from "./mockHospitalData";
import mockSchoolData from "./mockSchoolData";

const mockData = [...mockHospitalData, ...mockSchoolData];

// Simulate an asynchronous data loading function
export const loadInfrastructureData = async (offset, limit, type = "all") => {
  // Simulate loading data with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredData;
      if (type === "all") {
        filteredData = mockData;
      } else if (type === "hospital") {
        filteredData = mockHospitalData;
      } else if (type === "school") {
        filteredData = mockSchoolData;
      } else {
        filteredData = mockData;
      }
      const slicedData = filteredData.slice(offset, offset + limit);
      resolve(slicedData);
    }, 1000); // Simulate a 1 second loading time
  });
};

export default mockData;
