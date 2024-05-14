import { useState, useEffect } from "react";
import axios from "axios";

const Performance = () => {
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    // Fetch performance data when the component mounts
    axios
      .get("http://localhost:3001/performance")
      .then((response) => {
        setPerformanceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching performance data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Performance Data</h2>
      {performanceData && (
        <div>
          <h3>Total Carbs</h3>
          <p>{performanceData.date.join(", ")}</p>
          <h3>Total Carbs</h3>
          <p>{performanceData.totalCarbs.join(", ")}</p>
          <h3>Total Protein</h3>
          <p>{performanceData.totalProtein.join(", ")}</p>
          <h3>Total Fiber</h3>
          <p>{performanceData.totalFiber.join(", ")}</p>
          <h3>Total Sugar</h3>
          <p>{performanceData.totalSugar.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default Performance;
