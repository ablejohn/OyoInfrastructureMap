import { useState, useEffect } from "react";

export const useInfrastructureData = (
  activeLayer,
  callback,
  pageSize = 1000,
  maxItems = 100000
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let worker;

    const loadData = () => {
      setLoading(true);
      setError(null);

      worker = new Worker(new URL("./dataWorker.js", import.meta.url));

      worker.postMessage({ activeLayer, pageSize, maxItems });

      worker.onmessage = (e) => {
        if (e.data.type === "progress") {
          callback(e.data.count);
        } else if (e.data.type === "complete") {
          setData(e.data.data);
          setLoading(false);
        }
      };

      worker.onerror = (err) => {
        setError(err.message);
        setLoading(false);
      };
    };

    loadData();

    return () => {
      if (worker) {
        worker.terminate();
      }
    };
  }, [activeLayer, callback, pageSize, maxItems]);

  return { data, loading, error };
};

// Utility function to get statistics from the processed data
export const getStatistics = (data) => {
  const stats = {
    totalSchools: 0,
    totalHospitals: 0,
    schoolsByState: {},
    hospitalsByState: {},
    schoolsByOwnership: {},
    hospitalsByOwnership: {},
  };

  data.forEach((item) => {
    if (item.type === "school") {
      stats.totalSchools++;
      stats.schoolsByState[item.state] =
        (stats.schoolsByState[item.state] || 0) + 1;
      stats.schoolsByOwnership[item.ownership] =
        (stats.schoolsByOwnership[item.ownership] || 0) + 1;
    } else if (item.type === "hospital") {
      stats.totalHospitals++;
      stats.hospitalsByState[item.state] =
        (stats.hospitalsByState[item.state] || 0) + 1;
      stats.hospitalsByOwnership[item.ownership] =
        (stats.hospitalsByOwnership[item.ownership] || 0) + 1;
    }
  });

  return stats;
};
