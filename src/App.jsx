import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MapComponent from "./Components/Map/Map";
import StatisticsCard from "./Components/Charts/StatisticsCard";
import { ButtonGroup } from "./Components/UI/Button"; // Adjust based on your component structure
import { loadRealData } from "./Data/loadRealData"; // Ensure the path is correct
import "./Styles/App.css";

const App = () => {
  const [activeLayer, setActiveLayer] = useState("all");
  const [mapCenter, setMapCenter] = useState([9.0765, 8.6776]); // Center of Nigeria
  const [mapZoom, setMapZoom] = useState(5);
  const [infrastructureData, setInfrastructureData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadRealData(); // Ensure loadRealData returns an array
        setInfrastructureData(data);
      } catch (err) {
        setError(err.message || "An error occurred while loading the data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Error handling
  if (loading) {
    return (
      <div
        className="spinner-grow"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  // Filter data based on the active layer
  const filteredData =
    activeLayer === "all"
      ? infrastructureData
      : infrastructureData.filter((item) => item.type === activeLayer);

  // Example of getting statistics
  const getStatistics = (data) => {
    const types = data.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {});

    return {
      total: data.length,
      types,
    };
  };

  const comparisonData = getStatistics(infrastructureData);

  return (
    <div className="app-container">
      <h1 className="text-center text-success">NIGERIA INFRASTRUCTURE MAP</h1>

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
            <StatisticsCard data={infrastructureData} />{" "}
            {/* Ensure this is an array */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
