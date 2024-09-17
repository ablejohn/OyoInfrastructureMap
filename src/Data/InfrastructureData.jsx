const getRandomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

// Function to generate mock data for schools and hospitals
export const generateMockData = () => {
  const schools = [
    "University of Ibadan",
    "Ladoke Akintola University of Technology",
    "Lead City University",
    "Ajayi Crowther University",
    "The Polytechnic Ibadan",
    "Federal College of Education (Special) Oyo",
    "Emmanuel Alayande College of Education",
    "Oyo State College of Agriculture and Technology",
    "Oke-Ogun Polytechnic",
    "Oyede High School",
    "Ibadan Grammar School",
    "Loyola College Ibadan",
    "St. Anne's School Ibadan",
    "Government College Ibadan",
    "Olivet Baptist High School",
    "Methodist High School, Ibadan",
    "Ikolaba Grammar School",
    "Alhaja Awopa Memorial School",
  ];

  const hospitals = [
    "University College Hospital, Ibadan",
    "Ladoke Akintola University of Technology Teaching Hospital",
    "Bowen University Teaching Hospital",
    "Adeoyo Maternity Teaching Hospital",
    "Ring Road State Hospital",
    "Jericho Specialist Hospital",
    "St. Mary's Hospital",
    "Molly Specialist Hospital",
    "Oluyoro Catholic Hospital",
    "Oni Memorial Children's Hospital",
    "Baptist Medical Centre, Ogbomoso",
    "Oyo State Hospital, Ogbomoso",
    "Bowen University Teaching Hospital, Ogbomoso",
    "Alaafia Tayo Hospital & Maternity Centre",
    "Afe Babalola Multi-System Hospital",
  ];

  const majorCities = [
    { name: "Ibadan", lat: 7.3775, lng: 3.947, population: 3565108 },
    { name: "Ogbomosho", lat: 8.1333, lng: 4.2567, population: 433030 },
    { name: "Oyo", lat: 7.85, lng: 3.9333, population: 736072 },
    { name: "Iseyin", lat: 7.9667, lng: 3.6, population: 387592 },
    { name: "Saki", lat: 8.6667, lng: 3.3833, population: 178677 },
  ];

  const newData = [];

  schools.forEach((school, index) => {
    const city = majorCities[Math.floor(Math.random() * majorCities.length)];
    newData.push({
      id: `school_${index}`,
      type: "school",
      name: school,
      lat: getRandomInRange(city.lat - 0.1, city.lat + 0.1),
      lng: getRandomInRange(city.lng - 0.1, city.lng + 0.1),
      city: city.name,
    });
  });

  hospitals.forEach((hospital, index) => {
    const city = majorCities[Math.floor(Math.random() * majorCities.length)];
    newData.push({
      id: `hospital_${index}`,
      type: "hospital",
      name: hospital,
      lat: getRandomInRange(city.lat - 0.1, city.lat + 0.1),
      lng: getRandomInRange(city.lng - 0.1, city.lng + 0.1),
      city: city.name,
    });
  });

  return newData;
};
