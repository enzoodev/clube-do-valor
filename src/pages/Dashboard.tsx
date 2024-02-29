import React, { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

import { fetchDashboard } from '@features/dashboard/actions';

import { useAppDispatch } from '@hooks/useAppDispatch';

import { Header } from '@components/Header';
import { Transactions } from '@components/Dashboard/Transactions';
import { AdvisorSummary } from '@components/Dashboard/AdvisorSummary';
import { PortfoliosByBrokerChart } from '@components/Dashboard/PortfoliosByBrokerChart';
import { EvoluationOfAssets } from '@components/Dashboard/EvoluationOfAssets';
import { AssetsByBrokerChart } from '@components/Dashboard/AssetsByBroker';
import { SideBar } from '@components/SideBar';

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleFetchDashboardData = useCallback(async () => {
    try {
      await dispatch(fetchDashboard()).unwrap();
    } catch (error) {
      toast.error('Erro ao buscar dados do dashboard.');
    }
  }, [dispatch]);

  useEffect(() => {
    handleFetchDashboardData();
  }, [handleFetchDashboardData]);

  return (
    <div>
      <Header />
      <div className="w-full flex flex-row">
        <SideBar />
        <main className="w-full flex flex-col p-4 gap-4 bg-gray-50">
          <AdvisorSummary />
          <EvoluationOfAssets />
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <PortfoliosByBrokerChart />
            <AssetsByBrokerChart />
          </div>
          <Transactions />
        </main>
      </div>
    </div>
  );
};
