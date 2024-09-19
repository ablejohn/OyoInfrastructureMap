import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LabelList, PieChart, Pie, Cell
} from 'recharts';

const InfrastructureAnalysisDashboard = ({ data, comparisonData }) => {
  const totalPopulation = 7840864; // Oyo State population (2020 estimate)

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#F1F8E9',
          padding: '10px',
          border: '1px solid #8BC34A',
          borderRadius: '5px',
        }}>
          <p style={{ fontWeight: 'bold', marginBottom: '5px', color: '#33691E' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const hospitals = data.filter((item) => item.type === "hospital").length;
  const schools = data.filter((item) => item.type === "school").length;

  const calculateGap = (current, required) => {
    const gap = required - current;
    const percentageMet = (current / required) * 100;
    return {
      absolute: gap,
      percentage: percentageMet.toFixed(2)
    };
  };

  const hospitalGap = calculateGap(hospitals, Math.ceil(totalPopulation / 100000));
  const schoolGap = calculateGap(schools, Math.ceil(totalPopulation / 3000));

  const pieData = [
    { name: 'Hospitals', value: hospitals, color: '#4CAF50' },
    { name: 'Schools', value: schools, color: '#8BC34A' },
  ];

  const COLORS = ['#4CAF50', '#8BC34A'];

  return (
    <div className="card mb-4" style={{
      backgroundColor: "#F1F8E9",
      borderRadius: "8px",
      border: "1px solid #8BC34A",
    }}>
      <div className="card-body" style={{ color: "#33691E" }}>
        <h5 className="card-title" style={{ fontWeight: "bold", color: "#689F38", marginBottom: '20px' }}>
          Comprehensive Infrastructure Analysis
        </h5>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '60%' }}>
            <h6 style={{ color: '#33691E', marginBottom: '10px' }}>Current vs Required Infrastructure</h6>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C8E6C9" />
                <XAxis dataKey="name" tick={{ fill: '#33691E' }} />
                <YAxis tick={{ fill: '#33691E' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: '#33691E' }} />
                <Bar dataKey="current" fill="#4CAF50" name="Current">
                  <LabelList dataKey="current" position="top" fill="#33691E" />
                </Bar>
                <Bar dataKey="required" fill="#8BC34A" name="Required">
                  <LabelList dataKey="required" position="top" fill="#33691E" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ width: '35%' }}>
            <h6 style={{ color: '#33691E', marginBottom: '10px' }}>Infrastructure Distribution</h6>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ backgroundColor: '#E8F5E9', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #4CAF50' }}>
          <h6 style={{ color: '#33691E', marginBottom: '10px', fontWeight: 'bold' }}>Detailed Infrastructure Analysis</h6>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '48%' }}>
              <h7 style={{ color: '#33691E', fontWeight: 'bold' }}>Hospitals</h7>
              <ul style={{ color: '#1B5E20', paddingLeft: '20px' }}>
                <li>Current: {hospitals}</li>
                <li>Required: {Math.ceil(totalPopulation / 100000)}</li>
                <li>Gap: {hospitalGap.absolute}</li>
                <li>Percentage Met: {hospitalGap.percentage}%</li>
              </ul>
            </div>
            <div style={{ width: '48%' }}>
              <h7 style={{ color: '#33691E', fontWeight: 'bold' }}>Schools</h7>
              <ul style={{ color: '#1B5E20', paddingLeft: '20px' }}>
                <li>Current: {schools}</li>
                <li>Required: {Math.ceil(totalPopulation / 3000)}</li>
                <li>Gap: {schoolGap.absolute}</li>
                <li>Percentage Met: {schoolGap.percentage}%</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#E8F5E9', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #4CAF50' }}>
          <h6 style={{ color: '#33691E', marginBottom: '10px', fontWeight: 'bold' }}>Recommendations</h6>
          <ul style={{ color: '#1B5E20', paddingLeft: '20px' }}>
            <li>Prioritize the construction of {hospitalGap.absolute} new hospitals to meet the required ratio.</li>
            <li>Develop a phased plan to build {schoolGap.absolute} additional schools to address the education infrastructure gap.</li>
            <li>Consider public-private partnerships to accelerate infrastructure development.</li>
            <li>Implement regular maintenance programs for existing facilities to ensure their longevity and effectiveness.</li>
          </ul>
        </div>

        <p className="mt-3" style={{ color: '#33691E' }}>
          <strong>Calculation Basis:</strong>
          <br />
          Hospitals: 1 per 100,000 people
          <br />
          Schools: 1 per 3,000 people
        </p>
      </div>
    </div>
  );
};

export default InfrastructureAnalysisDashboard;