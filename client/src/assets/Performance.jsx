import { useState, useEffect } from "react";
import axios from "axios";

const Performance = () => {
  const [performanceData, setPerformanceData] = useState({
    totalCarbs: [],
    totalProtein: [],
    totalFiber: [],
    totalSugar: [],
    date: [],
  });

 useEffect(() => {
  axios
    .get("http://localhost:3001/performance")
    .then((response) => {
      setPerformanceData(response.data);
      console.log(response.data); // Log the entire response
    })
    .catch((error) => {
      console.error("Error fetching performance data:", error);
    });
}, []);


  if (
    !performanceData ||
    Object.values(performanceData).some(
      (arr) => !Array.isArray(arr) || arr.length === 0
    )
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Performance Data</h2>
      
      <h3>Total Carbs</h3>
      <p>{performanceData.totalCarbs.join(", ")}</p>
      <h3>Total Protein</h3>
      <p>{performanceData.totalProtein.join(", ")}</p>
      <h3>Total Fiber</h3>
      <p>{performanceData.totalFiber.join(", ")}</p>
      <h3>Total Sugar</h3>
      <p>{performanceData.totalSugar.join(", ")}</p>
      <h3>Dates</h3>
      <p>{performanceData.date.join(", ")}</p>
    </div>
  );
};

export default Performance;
