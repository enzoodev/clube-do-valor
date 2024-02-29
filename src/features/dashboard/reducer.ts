import { createSlice } from '@reduxjs/toolkit';
import { DashboardState } from './types';
import {
  fetchClientTransactions,
  fetchDashboard,
  fetchPaginatedTransactions,
} from './actions';

const initialState: DashboardState = {
  isLoading: true,
  data: {
    advisorSummary: {
      client_count: 0,
      total_equity: 0,
      average_equity: 0,
      equity_history: [],
    },
    clientsSummary: {
      page: 1,
      isLoadingPaginated: false,
      isLoadingSearching: false,
      items: [],
      transactions: [],
    },
  },
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDashboard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDashboard.fulfilled, (state, action) => {
      const { advisor_summary, clients_summary } = action.payload.data;
      state.data.advisorSummary = advisor_summary;
      state.data.clientsSummary.items = clients_summary;
      state.data.clientsSummary.transactions = clients_summary
        .flatMap((client) =>
          client.latest_transactions.map((item) => ({
            ...item,
            clientName: client.name,
          })),
        )
        .slice(0, 6);
      state.isLoading = false;
    });
    builder.addCase(fetchDashboard.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(fetchClientTransactions.pending, (state) => {
      state.data.clientsSummary.isLoadingSearching = true;
    });
    builder.addCase(fetchClientTransactions.fulfilled, (state, action) => {
      state.data.clientsSummary.transactions = action.payload;
      state.data.clientsSummary.page = 1;
      state.data.clientsSummary.isLoadingSearching = false;
    });
    builder.addCase(fetchClientTransactions.rejected, (state) => {
      state.data.clientsSummary.isLoadingSearching = false;
    });

    builder.addCase(fetchPaginatedTransactions.pending, (state) => {
      state.data.clientsSummary.isLoadingPaginated = true;
    });
    builder.addCase(fetchPaginatedTransactions.fulfilled, (state, action) => {
      const { data, page } = action.payload;
      state.data.clientsSummary.transactions = data;
      state.data.clientsSummary.page = page;
      state.data.clientsSummary.isLoadingPaginated = false;
    });
    builder.addCase(fetchPaginatedTransactions.rejected, (state) => {
      state.data.clientsSummary.isLoadingPaginated = false;
    });
  },
});

export const dashboardReducer = dashboardSlice.reducer;
