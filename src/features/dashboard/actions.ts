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
  async (search: string) => {
    const data = await ApiService.fetchClientTransactions(search);
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
