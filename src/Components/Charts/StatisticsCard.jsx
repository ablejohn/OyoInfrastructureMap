// src/Components/Charts/StatisticsCard.jsx
import React from "react";
import InfrastructureBarChart from "./InfrastructureBarChart";

const StatisticsCard = ({ data, comparisonData }) => {
  const totalPopulation = 7840864; // Oyo State population (2020 estimate)

  return (
    <>
      {/* Oyo State Infrastructure Statistics */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Oyo State Infrastructure Statistics</h5>
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
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Infrastructure Gap Analysis</h5>
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
