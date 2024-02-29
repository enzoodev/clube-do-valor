import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

import { selectDashboardAdvisorSummary } from '@features/dashboard';

import { useAppSelector } from '@hooks/useAppSelector';

import { formatValueLabel } from '@utils/formatValueLabel';
import { translateMonthToPortuguese } from '@utils/translateMonthToPortuguese';

export const EvoluationOfAssets: React.FC = () => {
  const advisorSummary = useAppSelector(selectDashboardAdvisorSummary);
  const data = advisorSummary.equity_history.map((item) => {
    const day = new Date(item.date).getDate();
    const monthInPortuguese = translateMonthToPortuguese(item.date).slice(0, 3);

    return {
      date: `${day} ${monthInPortuguese}`,
      value: item.value,
    };
  });

  return (
    <div className="w-full flex h-96 w-full flex flex-col gap-7 rounded-2xl p-6 bg-[#FFF] drop-shadow">
      <div className="flex flex-row items-center gap-2.5">
        <h3 className="text-xl text-gray-900 font-semibold">
          Evolução de Patrimônio Sob Custódia
        </h3>
        <InformationCircleIcon className="h-6 w-6 text-[#9CA3AF]" />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={350}
          data={data}
          margin={{
            top: 25,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            dataKey="value"
            tickFormatter={(value) => formatValueLabel(value)}
          />
          <Line
            type="natural"
            dataKey="value"
            stroke="#1C64F2"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
