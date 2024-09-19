import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import InfrastructureAnalysisDashboard from './InfrastructureBarChart';

const StatisticsCard = ({ data, comparisonData }) => {
  const totalPopulation = 7840864; // Oyo State population (2020 estimate)
  const [hoveredStat, setHoveredStat] = useState(null);

  const hospitals = data.filter((item) => item.type === "hospital").length;
  const schools = data.filter((item) => item.type === "school").length;

  const pieData = [
    { name: 'Hospitals', value: hospitals, color: '#4CAF50' },
    { name: 'Schools', value: schools, color: '#8BC34A' },
  ];

  const formatNumber = (num) => num.toLocaleString();

  const calculateRatio = (count, divisor) => (count / (totalPopulation / divisor)).toFixed(2);

  const StatItem = ({ label, value, ratio, basis }) => (
    <div 
      className="card-text" 
      style={{ 
        padding: '10px', 
        margin: '5px 0', 
        backgroundColor: hoveredStat === label ? '#C8E6C9' : 'transparent',
        borderRadius: '5px',
        transition: 'background-color 0.3s'
      }}
      onMouseEnter={() => setHoveredStat(label)}
      onMouseLeave={() => setHoveredStat(null)}
    >
      <strong>{label}:</strong> {formatNumber(value)}
      <div style={{ fontSize: '0.9em', color: '#4CAF50' }}>
        Ratio: {ratio} per {formatNumber(basis)} people
      </div>
    </div>
  );

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
            style={{ fontWeight: "bold", color: "#388E3C", marginBottom: '20px' }}
          >
            Oyo State Infrastructure Statistics
          </h5>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <p className="card-text" style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
                Population: {formatNumber(totalPopulation)}
              </p>
              <StatItem label="Hospitals" value={hospitals} ratio={calculateRatio(hospitals, 100000)} basis={100000} />
              <StatItem label="Schools" value={schools} ratio={calculateRatio(schools, 3000)} basis={3000} />
            </div>
            <div style={{ flex: 1, maxHeight: '200px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${name}: ${value}`, 'Count']}
                    contentStyle={{ backgroundColor: '#E8F5E9', border: '1px solid #4CAF50' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Infrastructure Gap Analysis */}
      <InfrastructureAnalysisDashboard data={data} comparisonData={comparisonData} />
    </>
  );
};

export default StatisticsCard;