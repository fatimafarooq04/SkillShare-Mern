import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Linechart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = chartRef.current;
    const gradient = chart.ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0.6)');
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0.05)');

    chart.data.datasets[0].backgroundColor = gradient;
    chart.update();
  }, []);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Users',
        data: [300, 500, 450, 700, 650, 800, 950],
        borderColor: '#36A2EB',
        pointBackgroundColor: '#36A2EB',
        pointRadius: 4,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#555',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#666',
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: '#666',
          beginAtZero: true,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
  };

  return (
    <div style={{ height: '350px' }}>
      <Line data={data} options={options} ref={chartRef} />
    </div>
  );
};

export default Linechart;
