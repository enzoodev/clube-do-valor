import React from 'react';

import { DashboardClientLatestFormattedTransaction } from '@features/dashboard/types';

import { formatValue } from '@utils/formatValue';
import { formatDateToBrazilianLabel } from '@utils/formatDateToBrazilianLabel';
import { formatDateToBrazilian } from '@utils/formatDateToBrazilianDate';

type Props = {
  item: DashboardClientLatestFormattedTransaction;
  isEven: boolean;
};

export const TransactionItem = React.memo(({ item, isEven }: Props) => {
  const isContribuition = item.type === 'Aporte';
  const typeColor = isContribuition ? 'text-[#03543F]' : 'text-[#9B1C1C]';
  const typeBackground = isContribuition ? 'bg-[#DEF7EC]' : 'bg-[#FBD5D5]';

  return (
    <div className="w-full flex items-center justify-between">
      <div
        className={`hidden sm:flex text-sm text-[#111827] p-4 ${isEven ? '' : 'bg-gray-50'} flex flex-1`}
      >
        {item.clientName}
      </div>
      <div
        className={`hidden md:flex text-sm text-[#6B7280] p-4 ${isEven ? '' : 'bg-gray-50'} flex flex-1`}
      >
        {formatDateToBrazilianLabel(item.date)}
      </div>
      <div
        className={`flex md:hidden text-xs sm:text-sm text-[#6B7280] p-4 ${isEven ? '' : 'bg-gray-50'} flex flex-1`}
      >
        {formatDateToBrazilian(item.date)}
      </div>
      <div
        className={`text-xs sm:text-sm md:text-base text-[#111827] font-medium p-4 ${isEven ? '' : 'bg-gray-50'} flex flex-1`}
      >
        {isContribuition ? '' : '-'}
        {formatValue(item.value)}
      </div>
      <div className={`p-4 ${isEven ? '' : 'bg-gray-50'} flex flex-1`}>
        <div
          className={`text-xs ${typeColor} ${typeBackground} py-0.5 px-2 rounded-xl`}
        >
          {item.type}
        </div>
      </div>
    </div>
  );
});
