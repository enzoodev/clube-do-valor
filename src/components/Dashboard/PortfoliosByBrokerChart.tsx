import React from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { useAppSelector } from '@hooks/useAppSelector';
import { selectPortfoliosByBroker } from '@features/dashboard';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const PortfoliosByBrokerChart: React.FC = () => {
  const portfolios = useAppSelector(selectPortfoliosByBroker);
  console.log(portfolios);
  return (
    <div>
      <Bar
        data={{
          labels: ['C. A, C. B, C. C'],
          datasets: [
            {
              label: 'C. A',
              data: 50,
              backgroundColor: 'rgba(255, 99, 132, 0.4)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
            {
              label: 'C. B',
              data: 30,
              backgroundColor: 'rgba(54, 162, 235, 0.4)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
            {
              label: 'C. C',
              data: 40,
              backgroundColor: 'rgba(255, 206, 86, 0.4)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1,
            },
          ],
        }}
        options={{
          indexAxis: 'y',
          responsive: true,
          layout: {
            padding: 30,
          },
          plugins: {
            legend: {
              display: false, // Hide legend
            },
          },
        }}
      />
    </div>
  );
};
