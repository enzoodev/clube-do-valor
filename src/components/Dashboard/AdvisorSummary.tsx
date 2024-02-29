import React from 'react';

import { selectDashboardAdvisorSummary } from '@features/dashboard';

import { useAppSelector } from '@hooks/useAppSelector';

import { formatValueLabel } from '@utils/formatValueLabel';

import { InfoCard } from '@components/InfoCard';

export const AdvisorSummary: React.FC = () => {
  const advisor = useAppSelector(selectDashboardAdvisorSummary);

  return (
    <div className="w-full flex flex-col md:flex-row md:h-32 lg:h-28 gap-4">
      <InfoCard
        title="Clientes"
        subtitle={advisor.client_count.toString()}
        current={12}
      />
      <InfoCard
        title="Patrimônio Sob Custódia"
        subtitle={formatValueLabel(advisor.total_equity)}
        current={12}
      />
      <InfoCard
        title="Patrimônio Médio"
        subtitle={formatValueLabel(advisor.total_equity)}
        current={-5}
      />
    </div>
  );
};
