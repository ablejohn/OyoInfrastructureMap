import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MapComponent from "./Components/Map/Map";
import StatisticsCard from "./Components/Charts/StatisticsCard";
import { ButtonGroup } from "./Components/UI/Button"; // Import ButtonGroup
import { generateMockData } from "./Data/InfrastructureData";
import { getStatistics } from "./Data/StatsData";
import "./Styles/App.css";

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
      <h1 className="centered-heading">Oyo State Infrastructure Map</h1>
      <div className="row">
        <div className="col-md-8">
          <MapComponent
            mapCenter={mapCenter}
            mapZoom={mapZoom}
            filteredData={filteredData}
            setMapCenter={setMapCenter}
            setMapZoom={setMapZoom}
          />
          <ButtonGroup
            activeLayer={activeLayer}
            setActiveLayer={setActiveLayer}
          />
        </div>
        <div className="col-md-4">
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
