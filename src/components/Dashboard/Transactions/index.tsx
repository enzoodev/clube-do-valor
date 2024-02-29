import React, { useCallback } from 'react';
import { v4 } from 'uuid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import {
  selectDashboardClientsSummary,
  selectDashboardIsLoading,
  selectDashboardTransactions,
} from '@features/dashboard';

import { useAppSelector } from '@hooks/useAppSelector';

import { TransactionSkeletonItem } from './SkeletonItem';
import { TransactionItem } from './Item';

export const Transactions: React.FC = () => {
  const clientsSummary = useAppSelector(selectDashboardClientsSummary);
  const transactions = useAppSelector(selectDashboardTransactions);
  const isLoading = useAppSelector(selectDashboardIsLoading);

  const renderTransactions = useCallback(() => {
    if (
      isLoading ||
      clientsSummary.isLoadingPaginated ||
      clientsSummary.isLoadingSearching
    ) {
      return Array.from({ length: 6 }, () => (
        <TransactionSkeletonItem key={v4()} />
      ));
    }

    if (transactions.length === 0) {
      return;
    }

    return transactions.map((item, index) => (
      <TransactionItem item={item} isEven={index % 2 === 0} key={v4()} />
    ));
  }, [
    clientsSummary.isLoadingPaginated,
    clientsSummary.isLoadingSearching,
    isLoading,
    transactions,
  ]);

  return (
    <div className="flex flex-col gap-4 rounded-2xl p-6 bg-[#FFF] drop-shadow">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl text-gray-900 font-semibold">Movimentações</h3>
          <p className="text-sm text-[#6B7280]">
            Lista das últimas movimentações
          </p>
        </div>
        <div className="flex items-center bg-[#F9FAFB] gap-2.5 w-full max-w-96 rounded-2xl border border-[#E5E7EB] px-3.5 h-11">
          <MagnifyingGlassIcon className="h-5 w-5 text-[##6B7280]" />
          <input
            placeholder="Pesquisar"
            type="text"
            className="w-full rounded-2xl h-full bg-[#F9FAFB]"
          />
        </div>
      </div>
      <div>
        <div className="w-full flex items-center justify-between">
          <div className="text-xs text-[#6B7280] font-semibold p-4 bg-gray-50 flex flex-1 rounded-tl-xl border-b border-gray-200">
            Cliente
          </div>
          <div className="text-xs text-[#6B7280] font-semibold p-4 bg-gray-50 flex flex-1 border-b border-gray-200">
            Data
          </div>
          <div className="text-xs text-[#6B7280] font-semibold p-4 bg-gray-50 flex flex-1 border-b border-gray-200">
            Valor
          </div>
          <div className="text-xs text-[#6B7280] font-semibold p-4 bg-gray-50 flex flex-1 rounded-tr-xl border-b border-gray-200">
            Tipo
          </div>
        </div>
        <ul>{renderTransactions()}</ul>
      </div>
    </div>
  );
};
