import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import Chart.js

function Chart2() {
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8085/reports/getCombinedInvoiceReports"
        );
        const data = await response.json();
        console.log(data);
        if (data && Array.isArray(data.response)) {
          setChartData(data.response);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Fetch data when component mounts

  // Render the chart when data changes
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy the previous chart instance
    }

    if (chartData.length > 0) {
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: chartData.map((item) => item.invoice_id),
          datasets: [
            {
              label: "Total Income",
              data: chartData.map((item) => item.total_income),
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              ticks: {
                maxTicksLimit: 15, // Limit the number of x-axis ticks to 15
              },
              title: {
                display: true,
                text: 'Invoice ID', // Name the x-axis
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Revenue', // Name the y-axis
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: (tooltipItems) => {
                  const index = tooltipItems[0].dataIndex;
                  const date = chartData[index].inv_createddate;
                  return `Date: ${new Date(date).toLocaleDateString()}`;
                },
                label: (tooltipItem) => {
                  const income = chartData[tooltipItem.dataIndex].total_income;
                  return `Total Income: ${income}`;
                },
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <div style={{width:"400px"}}>
      <canvas ref={chartRef} id="myChart"></canvas>
    </div>
  );
}

export default Chart2;
