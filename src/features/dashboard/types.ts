export type DashboardState = {
  isLoading: boolean;
  data: {
    advisorSummary: DashboardAdvisorSummary;
    clientsSummary: DashboardCliemtsSummary;
  };
};

export type DashboardCliemtsSummary = {
  page: number;
  isLoadingPaginated: boolean;
  isLoadingSearching: boolean;
  items: DashboardClientSummaryItem[];
  transactions: DashboardClientLatestFormattedTransaction[];
};

export type DashboardDTO = {
  data: {
    advisor_summary: DashboardAdvisorSummary;
    clients_summary: DashboardClientSummaryItem[];
  };
};

export type DashboardAdvisorSummary = {
  client_count: number;
  total_equity: number;
  average_equity: number;
  equity_history: DashboardEquityHistoryItem[];
};

export type DashboardEquityHistoryItem = {
  date: string;
  value: number;
};

export type DashboardClientSummaryItem = {
  name: string;
  broker: Broker;
  latest_transactions: DashboardClientLatestTransaction[];
};

export type DashboardClientLatestTransaction = {
  date: string;
  value: number;
  type: TransactionType;
};

export type DashboardClientLatestFormattedTransaction = {
  clientName: string;
  date: string;
  value: number;
  type: TransactionType;
};

export type TransactionType = 'Aporte' | 'Resgate';

export type Broker = 'A' | 'B' | 'C';
