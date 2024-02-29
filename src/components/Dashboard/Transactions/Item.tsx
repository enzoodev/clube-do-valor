import React from 'react';

import { DashboardClientLatestFormattedTransaction } from '@features/dashboard/types';

import { formatValue } from '@utils/formatValue';
import { formatDateToBrazilianLabel } from '@utils/formatDateToBrazilianLabel';

type Props = {
  item: DashboardClientLatestFormattedTransaction;
  isEven: boolean;
};

export const TransactionItem = React.memo(({ item, isEven }: Props) => {
  const isContribuition = item.type === 'Aporte';

  return (
    <div className="w-full flex items-center justify-between">
      <div
        className={`text-sm text-[#111827] p-4 ${isEven ? '' : 'bg-gray-50'} flex flex-1`}
      >
        {item.clientName}
      </div>
      <div
        className={`text-sm text-[#111827] p-4 ${isEven ? '' : 'bg-gray-50'} flex flex-1`}
      >
        {formatDateToBrazilianLabel(item.date)}
      </div>
      <div
        className={`text-sm text-[#111827] p-4 ${isEven ? '' : 'bg-gray-50'} flex flex-1`}
      >
        {formatValue(item.value)}
      </div>
      <div
        className={`text-sm text-[#111827] p-4 ${isEven ? '' : 'bg-gray-50'} flex flex-1`}
      >
        {item.type}
      </div>
    </div>
  );
});
