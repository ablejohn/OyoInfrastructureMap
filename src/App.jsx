import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MapComponent from "./Components/Map/Map";
import StatisticsCard from "./Components/Charts/StatisticsCard";
import { ButtonGroup } from "./Components/UI/Button";
import {
  useInfrastructureData,
  getStatistics,
} from "./Data/InfrastructureData";
import "./Styles/App.css";

const App = () => {
  const [activeLayer, setActiveLayer] = useState("all");
  const [mapCenter, setMapCenter] = useState([9.0765, 7.3986]); // Center of Nigeria
  const [mapZoom, setMapZoom] = useState(6);
  const [progress, setProgress] = useState(0);

  const {
    data: infrastructureData,
    loading,
    error,
  } = useInfrastructureData(
    activeLayer,
    (processedCount) => {
      setProgress(processedCount);
    },
    1000,
    200000 // Increased maxItems to 200,000
  );

  const filteredData =
    activeLayer === "all"
      ? infrastructureData
      : infrastructureData.filter((item) => item.type === activeLayer);

  const comparisonData = getStatistics(infrastructureData);

  if (loading) {
    return (
      <div
        class="spinner-grow"
        style="width: 3rem; height: 3rem;"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="app-container">
      <h1 style={{ textAlign: "center", color: "green" }}>
        NIGERIA INFRASTRUCTURE MAP
      </h1>

      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-lg-8 mb-4">
            <div className="card shadow">
              <div className="card-body p-0">
                <MapComponent
                  mapCenter={mapCenter}
                  mapZoom={mapZoom}
                  filteredData={filteredData}
                  setMapCenter={setMapCenter}
                  setMapZoom={setMapZoom}
                />
              </div>
              <div className="card-footer bg-white border-top-0">
                <ButtonGroup
                  activeLayer={activeLayer}
                  setActiveLayer={setActiveLayer}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <StatisticsCard
              data={infrastructureData}
              comparisonData={comparisonData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
