import { useState, useEffect } from "react";
import styles from "../styles/HomeStyles.module.css";
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
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchPerformanceData = async () => {
      const email = localStorage.getItem('userEmail');
      if (!email) {
        console.error('User email not found');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3001/performance?email=${email}`);
        setPerformanceData(response.data);
        setLoading(false); // Set loading to false after data is fetched
        console.log(response.data); // Log the entire response
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };

    fetchPerformanceData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const LinearChartData = {
    labels: performanceData.date,
    datasets: [
      {
        label: "Protein",
        data: performanceData.totalProtein,
        borderColor: "#FF5580",
        backgroundColor: "#FF5580",
      },
      {
        label: "Carbs",
        data: performanceData.totalCarbs,
        borderColor: "#40A578",
        backgroundColor: "#40A578",
      },
      {
        label: "Sugar",
        data: performanceData.totalSugar,
        borderColor: "#FF9F66",
        backgroundColor: "#FF9F66",
      },
      {
        label: "Fiber",
        data: performanceData.totalFiber,
        borderColor: "#5AB2FF",
        backgroundColor: "#5AB2FF",
      },
    ],
  };

  return (
    <div className={styles.body2}>
      <div>
        <Line data={LinearChartData} />
      </div>
    </div>
  );
};

export default Performance;
