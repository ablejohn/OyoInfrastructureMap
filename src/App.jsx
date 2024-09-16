// src/App.jsx
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MapComponent from "./Components/Map/Map";
import StatisticsCard from "./Components/Charts/StatisticsCard";
import Button from "./Components/UI/Button";
import { generateMockData } from "./Data/InfrastructureData";
import { getStatistics } from "./Data/StatsData";

const App = () => {
  const [activeLayer, setActiveLayer] = useState("all");
  const [infrastructureData, setInfrastructureData] = useState([]);
  const [mapCenter, setMapCenter] = useState([8.1574, 3.6147]);
  const [mapZoom, setMapZoom] = useState(8);

  useEffect(() => {
    const generatedData = generateMockData();
    setInfrastructureData(generatedData);
  }, []);

  const filteredData =
    activeLayer === "all"
      ? infrastructureData
      : infrastructureData.filter((item) => item.type === activeLayer);

  const comparisonData = getStatistics(infrastructureData);

  return (
    <div className="container-fluid">
      <h1 className="mt-3 mb-4">Oyo State Infrastructure Map</h1>
      <div className="row">
        <div className="col-md-8">
          {/* Map Component */}
          <MapComponent
            mapCenter={mapCenter}
            mapZoom={mapZoom}
            filteredData={filteredData}
            setMapCenter={setMapCenter}
            setMapZoom={setMapZoom}
          />
          <div className="btn-group mt-3">
            <Button
              active={activeLayer === "all"}
              onClick={() => setActiveLayer("all")}
            >
              All
            </Button>
            <Button
              active={activeLayer === "hospital"}
              onClick={() => setActiveLayer("hospital")}
            >
              Hospitals
            </Button>
            <Button
              active={activeLayer === "school"}
              onClick={() => setActiveLayer("school")}
            >
              Schools
            </Button>
          </div>
        </div>
        <div className="col-md-4">
          {/* Statistics Card Component */}
          <StatisticsCard
            data={infrastructureData}
            comparisonData={comparisonData}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
