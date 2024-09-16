export const getStatistics = (infrastructureData) => {
  const totalPopulation = 7840864; // Oyo State population (2020 estimate)

  const comparisonData = [
    {
      name: "Hospitals",
      current: infrastructureData.filter((item) => item.type === "hospital")
        .length,
      required: Math.round(totalPopulation / 100000), // Assuming 1 hospital per 100,000 people
    },
    {
      name: "Schools",
      current: infrastructureData.filter((item) => item.type === "school")
        .length,
      required: Math.round(totalPopulation / 3000), // Assuming 1 school per 3,000 people
    },
  ];

  return comparisonData;
};
