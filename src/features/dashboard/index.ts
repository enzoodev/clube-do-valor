import { RootState } from '@store/index';
import { Broker, DashboardClientLatestFormattedTransaction } from './types';

export const selectDashboardAdvisorSummary = (state: RootState) =>
  state.dashboard.data.advisorSummary;

export const selectDashboardClientsSummary = (state: RootState) =>
  state.dashboard.data.clientsSummary;

export const selectDashboardClientNames = (state: RootState) =>
  state.dashboard.data.clientsSummary.items.map((item) => item.name);

export const selectDashboardTransactions = (
  state: RootState,
): DashboardClientLatestFormattedTransaction[] =>
  state.dashboard.data.clientsSummary.transactions;

export const selectPortfoliosByBroker = (
  state: RootState,
): Record<Broker, number> => {
  const { items } = state.dashboard.data.clientsSummary;

  return {
    A: items.filter((item) => item.broker === 'A').length,
    B: items.filter((item) => item.broker === 'B').length,
    C: items.filter((item) => item.broker === 'C').length,
  };
};

export const selectAssetsByBroker = (
  state: RootState,
): Record<Broker, number> => {
  const { items } = state.dashboard.data.clientsSummary;
  const { advisorSummary } = state.dashboard.data;

  const assetsByBroker: Record<Broker, number> = {
    A: 0,
    B: 0,
    C: 0,
  };

  items.forEach((item) => {
    const advisorItem = advisorSummary.equity_history.find(
      (advisorItem) =>
        new Date(advisorItem.date).toISOString().split('T')[0] ===
        item.latest_transactions[0]?.date,
    );
    if (advisorItem) {
      assetsByBroker[item.broker] += advisorItem.value;
    }
  });

  return assetsByBroker;
};

export const selectDashboardIsLoading = (state: RootState) =>
  state.dashboard.isLoading;
