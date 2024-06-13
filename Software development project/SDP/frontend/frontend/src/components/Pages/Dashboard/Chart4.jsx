import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const Chart4 = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipmentData = async () => {
      try {
        const res = await axios.get("http://localhost:8085/equipment");
        const equipmentData = res.data;

        // Process data for Chart.js
        const defectedEquipment = equipmentData
          .filter(e => e.eq_defected_status != 0)
          .slice(0, 10); // Get the top 10 defected items

        const labels = defectedEquipment.map(e => `ID: ${e.eq_id}`);
        const data = defectedEquipment.map(e => e.eq_defected_status);

        setChartData({
          labels,
          datasets: [
            {
              label: "Number of Defects",
              data,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error occurred while fetching equipment data:", error);
        setLoading(false);
      }
    };
    fetchEquipmentData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "500px", width: "800px" }}>
      <h2>Top 10 Defective Equipment</h2>
      <Bar
        data={chartData}
        options={{
          indexAxis: 'y', // Set the index axis to 'y' for a horizontal bar chart
          responsive: true,
          
          plugins: {
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: 'Top 10 Defective Equipment',
            },
          },
        }}
      />
    </div>
  );
};

export default Chart4;
