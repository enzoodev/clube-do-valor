import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiService } from '@services/ApiService';

export const fetchDashboard = createAsyncThunk(
  'dashboard/fetchDashboard',
  async () => {
    const data = await ApiService.fetch();
    return data;
  },
);

export const fetchClientTransactions = createAsyncThunk(
  'dashboard/fetchClientTransactions',
  async ({ search, reset }: { search: string; reset?: boolean }) => {
    const data = await ApiService.fetchClientTransactions(search);

    if (reset) {
      return data.slice(0, 6);
    }

    return data;
  },
);

export const fetchPaginatedTransactions = createAsyncThunk(
  'dashboard/fetchPaginatedTransactions',
  async (page: number) => {
    const data = await ApiService.fetchPaginatedTransactions(page);

    return {
      data,
      page,
    };
  },
);
