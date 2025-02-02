import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice"
import transferReducer from "./slices/transferSlice"

export const store = configureStore({
  reducer: {
    accounts: accountReducer,
    transfer: transferReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

