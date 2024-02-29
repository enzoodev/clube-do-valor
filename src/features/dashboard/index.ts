import { RootState } from '@store/index';
import { Broker, DashboardClientLatestFormattedTransaction } from './types';

export const selectDashboardAdvisorSummary = (state: RootState) =>
  state.dashboard.data.advisorSummary;

export const selectDashboardClientsSummary = (state: RootState) =>
  state.dashboard.data.clientsSummary;

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

export const selectDashboardIsLoading = (state: RootState) =>
  state.dashboard.isLoading;
