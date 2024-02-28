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
  broker: string;
  latest_transactions: DashboardClientLatestTransaction[];
};

export type DashboardClientLatestTransaction = {
  date: string;
  value: number;
  type: string;
};
