import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const InfrastructureBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="current" fill="#8884d8" name="Current" />
        <Bar dataKey="required" fill="#82ca9d" name="Required" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default InfrastructureBarChart;
