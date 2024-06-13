import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import Chart.js

function Chart3() {
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

  // Preprocess the data to group revenues and income by date and sum them for each day
  const groupedData = chartData.reduce((acc, item) => {
    const date = new Date(item.inv_createddate).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = { revenue: 0, income: 0 };
    }
    acc[date].revenue += parseFloat(item.total_revenue);
    acc[date].income += parseFloat(item.total_income);
    return acc;
  }, {});

  const dates = Object.keys(groupedData);
  const revenues = dates.map(date => groupedData[date].revenue);
  const incomes = dates.map(date => groupedData[date].income);

  // Calculate today's revenue
  const calculateTodaysRevenue = () => {
    const today = new Date().toLocaleDateString();
    return chartData
      .filter((item) => new Date(item.inv_createddate).toLocaleDateString() === today)
      .reduce((total, item) => total + parseFloat(item.total_revenue), 0);
  };

  const todaysRevenue = calculateTodaysRevenue();

  // Render the chart when data changes
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy the previous chart instance
    }

    if (dates.length > 0) {
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Total Revenue",
              data: revenues,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Total Income",
              data: incomes,
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date', // Name the x-axis
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount', // Name the y-axis
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: (tooltipItems) => {
                  return `Date: ${tooltipItems[0].label}`;
                },
                label: (tooltipItem) => {
                  const datasetLabel = tooltipItem.dataset.label;
                  const value = tooltipItem.raw;
                  return `${datasetLabel}: ${value}`;
                },
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <div style={{ width: "500px"}}>
      <canvas ref={chartRef} id="myChart"></canvas>
      <h3>Today's Revenue: ${todaysRevenue.toFixed(2)}</h3>
    </div>
  );
}

export default Chart3;
