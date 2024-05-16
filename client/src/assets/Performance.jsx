import { useState, useEffect } from "react";
// import styles from "../styles/HomeStyles.module.css";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Performance = () => {
  const [performanceData, setPerformanceData] = useState({
    date: [],
    totalCarbs: [],
    totalProtein: [],
    totalFiber: [],
    totalSugar: [],
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
  // const pr = ;
  const LinearChartData = {
    labels: performanceData.date,
    datasets: [
      {
        label: "protein",
        data: performanceData.totalProtein,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      // {
      //   label: "steps2",
      //   data: [2000, 7000, 4000, 8000, 10000, 12000, 5000],
      //   borderColor: "rgb(255, 99, 132)",
      //   backgroundColor: "rgba(255, 99, 132, 0.5)",
      // },
    ],
  };
  return (
    <div>
      {/* <h2>Performance Data</h2>
      <h3>Dates</h3>
      <p>{performanceData.date.join(", ")}</p>
      <h3>Total Carbs</h3>
      <p>{performanceData.totalCarbs.join(", ")}</p>
      <h3>Total Protein</h3>
      <p>{performanceData.totalProtein.join(", ")}</p>
      <h3>Total Fiber</h3>
      <p>{performanceData.totalFiber.join(", ")}</p>
      <h3>Total Sugar</h3>
      <p>{performanceData.totalSugar.join(", ")}</p> */}
      <div>
        <Line data={LinearChartData} />
      </div>
    </div>
  );
};

export default Performance;
