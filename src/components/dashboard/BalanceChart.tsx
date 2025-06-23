import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { useFasTag } from '../../contexts/FasTagContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BalanceChart: React.FC = () => {
  const { transactions } = useFasTag();
  
  // Process transactions to get balance history
  // Sort transactions by date, oldest first
  const sortedTransactions = [...transactions].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Create labels and data for chart
  const labels = sortedTransactions.map(transaction => 
    transaction.date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
  );
  
  const balanceData = sortedTransactions.map(transaction => transaction.balance);
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Balance',
        data: balanceData,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
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
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context: any) {
            return `Balance: ₹${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return `₹${value}`;
          },
        },
      },
    },
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Balance History</h3>
      <div className="h-64">
        <Line data={data} options={options as any} />
      </div>
    </div>
  );
};

export default BalanceChart;