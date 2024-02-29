/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { toast } from 'react-toastify';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

import {
  selectDashboardClientNames,
  selectDashboardClientsSummary,
  selectDashboardIsLoading,
  selectDashboardTransactions,
} from '@features/dashboard';
import {
  fetchClientTransactions,
  fetchPaginatedTransactions,
} from '@features/dashboard/actions';

import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';

import { TransactionSkeletonItem } from './SkeletonItem';
import { TransactionItem } from './Item';

export const Transactions: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isOpenSearchSelect, setIsOpenSearchSelect] = useState(false);
  const [searchText, setSearchText] = useState('');
  const dispatch = useAppDispatch();
  const clientsSummary = useAppSelector(selectDashboardClientsSummary);
  const clientNames = useAppSelector(selectDashboardClientNames);
  const transactions = useAppSelector(selectDashboardTransactions);
  const isLoading = useAppSelector(selectDashboardIsLoading);

  const handleResetSearch = useCallback(() => {
    setIsOpenSearchSelect(false);
    setSearchText('');
  }, []);

  const handleFetchTransactionsBySearch = useCallback(
    async (search: string) => {
      try {
        handleResetSearch();
        await dispatch(fetchClientTransactions({ search })).unwrap();
        setIsSearching(true);
      } catch (error) {
        toast.error('Erro ao buscar transações.');
      }
    },
    [dispatch, handleResetSearch],
  );

  const handleFetchTransactionsResetSearch = useCallback(async () => {
    try {
      handleResetSearch();
      await dispatch(
        fetchClientTransactions({ search: '', reset: true }),
      ).unwrap();
      setIsSearching(false);
    } catch (error) {
      toast.error('Erro ao buscar transações.');
    }
  }, [dispatch, handleResetSearch]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setIsOpenSearchSelect(true);
      setSearchText(event.target.value);
    }, []);

  const renderFilteredClients = useCallback(() => {
    const filteredClients = clientNames.filter((name) =>
      name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
    );

    if (filteredClients.length === 0) {
      return (
        <p className="text-[#6B7280] italic text-sm">
          Nenhum cliente encontrado.
        </p>
      );
    }

    return filteredClients.slice(0, 5).map((item) => (
      <p
        className="cursor-pointer text-[#6B7280] text-sm"
        onClick={() => handleFetchTransactionsBySearch(item)}
        key={v4()}
      >
        {item}
      </p>
    ));
  }, [clientNames, handleFetchTransactionsBySearch, searchText]);

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
      return (
        <div className="flex flex-row items-center gap-4 p-4 rounded-b-lg bg-gray-50">
          <XCircleIcon className="h-8 w-8 text-[##6B7280]" />
          <p className="text-[#6B7280] text-base text-center py-4">
            Nenhuma movimentação encontrada na busca.
          </p>
        </div>
      );
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

  const handleFetchPaginatedTransactions = useCallback(
    async (page: number) => {
      try {
        await dispatch(fetchPaginatedTransactions(page)).unwrap();
      } catch (error) {
        toast.error('Erro ao buscar transações.');
      }
    },
    [dispatch],
  );

  const searchRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpenSearchSelect(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  return (
    <div className="flex flex-col gap-4 rounded-2xl p-6 bg-[#FFF] drop-shadow">
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div>
          <h3 className="text-xl text-gray-900 font-semibold">Movimentações</h3>
          <p className="text-sm text-[#6B7280]">
            Lista das últimas movimentações
          </p>
        </div>
        <div className="flex flex-col gap-4" ref={searchRef}>
          <div className="flex items-center bg-[#F9FAFB] gap-2.5 w-full max-w-96 rounded-2xl border border-[#E5E7EB] px-3.5 h-11">
            <MagnifyingGlassIcon className="h-5 w-5 text-[##6B7280]" />
            <input
              placeholder="Pesquisar"
              type="text"
              className="w-full rounded-2xl h-full bg-[#F9FAFB]"
              value={searchText}
              onChange={handleInputChange}
            />
            {isSearching && (
              <XCircleIcon
                className="h-8 w-8 text-[##6B7280] cursor-pointer"
                onClick={handleFetchTransactionsResetSearch}
              />
            )}
          </div>
          <div
            className={`${!isOpenSearchSelect ? 'hidden' : ''} flex flex-col p-4 gap-4 absolute mt-12 bg-white rounded-lg border border-[#E5E7EB] shadow-lg`}
          >
            {renderFilteredClients()}
          </div>
        </div>
      </div>
      <div>
        <div className="w-full flex items-center justify-between">
          <div className="hidden sm:flex text-xs text-[#6B7280] font-semibold p-4 bg-gray-50 flex flex-1 rounded-tl-xl border-b border-gray-200">
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
      <div
        className={`${isSearching ? 'hidden' : ''} w-full flex items-center justify-center gap-3`}
      >
        {clientsSummary.page > 1 && (
          <ChevronLeftIcon
            className="h-5 w-5 text-[##6B7280] hover:text-[#18459F] cursor-pointer"
            onClick={() =>
              handleFetchPaginatedTransactions(clientsSummary.page - 1)
            }
          />
        )}
        <ul className="flex items-center gap-2.5">
          {Array.from({ length: 10 }, (_, index) => (
            <li key={v4()}>
              <button
                className={`${index + 1 === clientsSummary.page ? 'text-[#1C64F2]' : 'text-[#6B7280]'} hover:text-[#494C53] text-sm font-semibold`}
                onClick={() => handleFetchPaginatedTransactions(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
        {transactions.length > 0 && (
          <ChevronRightIcon
            className="h-5 w-5 text-[##6B7280] hover:text-[#18459F] cursor-pointer"
            onClick={() =>
              handleFetchPaginatedTransactions(clientsSummary.page + 1)
            }
          />
        )}
      </div>
    </div>
  );
};
