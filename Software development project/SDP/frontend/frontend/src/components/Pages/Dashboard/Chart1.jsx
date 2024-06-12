import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Title } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Title);

const LineChartComponent = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8085/reports/getEquipmentRevenueDetails");
      if (response.data.status) {
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

  // Extracting labels and revenue data from chartData
  const labels = chartData.map((equipment) => equipment.eq_name);
  const revenueData = chartData.map((equipment) => parseFloat(equipment.total_revenue));

  // Constructing the Line chart data
  const data = {
    labels: labels,
    datasets: [{
      label: 'Total Revenue',
      data: revenueData,
      backgroundColor: 'rgba(54, 162, 235, 0.5)', // Adjust color as needed
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 1
    }]
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Equipment Revenue'
      },
      legend: {
        display: false // You can adjust legend display as needed
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Revenue'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Equipment'
        }
      }
    }
  };

  // Render the Line chart
  return <Line data={data} options={options} />;
};

export default LineChartComponent;
