import React from "react";
import InfrastructureBarChart from "./InfrastructureBarChart";

const StatisticsCard = ({ data, comparisonData }) => {
  const totalPopulation = 7840864; // Oyo State population (2020 estimate)

  return (
    <>
      {/* Oyo State Infrastructure Statistics */}
      <div
        className="card mb-4"
        style={{
          backgroundColor: "#E8F5E9",
          borderRadius: "8px",
          border: "1px solid #4CAF50",
        }}
      >
        <div className="card-body" style={{ color: "#1B5E20" }}>
          <h5
            className="card-title"
            style={{ fontWeight: "bold", color: "#388E3C" }}
          >
            Oyo State Infrastructure Statistics
          </h5>
          <p className="card-text">
            Population: {totalPopulation.toLocaleString()}
          </p>
          <p className="card-text">
            Hospitals: {data.filter((item) => item.type === "hospital").length}
          </p>
          <p className="card-text">
            Schools: {data.filter((item) => item.type === "school").length}
          </p>
        </div>
      </div>

      {/* Infrastructure Gap Analysis */}
      <div
        className="card mb-4"
        style={{
          backgroundColor: "#F1F8E9",
          borderRadius: "8px",
          border: "1px solid #8BC34A",
        }}
      >
        <div className="card-body" style={{ color: "#33691E" }}>
          <h5
            className="card-title"
            style={{ fontWeight: "bold", color: "#689F38" }}
          >
            Infrastructure Gap Analysis
          </h5>
          <InfrastructureBarChart data={comparisonData} />
          <p className="mt-3">
            <strong>Calculation Basis:</strong>
            <br />
            Hospitals: 1 per 100,000 people
            <br />
            Schools: 1 per 3,000 people
          </p>
        </div>
      </div>
    </>
  );
};

export default StatisticsCard;
