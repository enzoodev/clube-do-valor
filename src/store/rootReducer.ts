import { combineReducers } from '@reduxjs/toolkit';

import { dashboardReducer } from '@features/dashboard/reducer';

export const rootReducer = combineReducers({
  dashboard: dashboardReducer,
});
