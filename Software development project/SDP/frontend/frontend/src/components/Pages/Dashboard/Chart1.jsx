import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Box } from "@mui/material";

ChartJS.register(ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const Chart1 = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8085/reports/getEquipmentRevenueDetails"
      );
      if (response.data.status) {
        console.log(response.data.response);
        setChartData(response.data.response);
      } else {
        console.log("Failed to retrieve data");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  if (!chartData) {
    return <div>Loading...</div>;
  }

  // Extracting equipment names and revenues
  const labels = chartData.map((item) => item.eq_name);
  const revenues = chartData.map((item) => parseFloat(item.total_revenue));

  // Constructing the Doughnut chart data
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Revenue",
        data: revenues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "left",
      },
      title: {
        display: true,
        text: "Equipment Revenue",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  // Render the Doughnut chart
  return (
    <Box width={"400px"} height={"300px"}>
      <Doughnut data={data} options={options} />
    </Box>
  );
};

export default Chart1;
