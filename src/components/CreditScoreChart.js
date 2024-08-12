import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const CreditScoreChart = ({ client }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  const [selectedPoints, setSelectedPoints] = useState([]);

  useEffect(() => {
    if (client && client.scores) {
      const labels = client.scores.transUnion.map(score =>
        new Date(score.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })
      );

      const datasets = [
        {
          label: 'TransUnion Credit Score',
          data: client.scores.transUnion.map(score => score.score),
          fill: false,
          borderColor: 'rgba(78, 115, 223, 1)',
          pointRadius: (ctx) => (selectedPoints.includes(ctx.dataIndex) ? 5 : 0),
          borderWidth: 2,
          tension: 0.5,
        },
        {
          label: 'Equifax Credit Score',
          data: client.scores.equifax.map(score => score.score),
          fill: false,
          borderColor: 'rgba(28, 200, 138, 1)',
          pointRadius: (ctx) => (selectedPoints.includes(ctx.dataIndex) ? 5 : 0),
          borderWidth: 2,
          tension: 0.5,
        },
        {
          label: 'Experian Credit Score',
          data: client.scores.experian.map(score => score.score),
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          pointRadius: (ctx) => (selectedPoints.includes(ctx.dataIndex) ? 5 : 0),
          borderWidth: 2,
          tension: 0.5,
        },
      ];

      setChartData({ labels, datasets });
    } else {
      console.error('Client or client scores are not available');
    }
  }, [client, selectedPoints]);

  const handleChartClick = (event) => {
    const chart = chartRef.current;
    if (chart) {
      const elements = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);

      // Debugging: Check elements found
      console.log('Elements found:', elements);
      if (elements.length) {
        const dataIndex = elements[0].index;
        console.log('Data Index:', dataIndex); // Log the index of the clicked point

        setSelectedPoints((prevSelected) => {
          if (prevSelected.includes(dataIndex)) {
            return prevSelected.filter((index) => index !== dataIndex); // Remove point if already selected
          } else {
            return [...prevSelected, dataIndex]; // Add point if not selected
          }
        });
      } else {
        console.log('No elements found at the clicked position.');
      }
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#333',
        },
      },
      title: {
        display: true,
        text: 'Credit Scores Over Time',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#333',
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return `Date: ${chartData.labels[index]}`;
          },
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
            color: '#333',
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
            color: '#333',
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', height: '400px', width: '100%', }}>
      {chartData ? (
        <Line
          ref={chartRef}
          data={chartData}
          options={options}
          onClick={handleChartClick}
        />
      ) : (
        <p style={{ color: '#333' }}>Loading chart data...</p>
      )}
    </div>
  );
};

export default CreditScoreChart;



