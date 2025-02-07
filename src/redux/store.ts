import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import transferReducer from "./slices/transferSlice";

/**
 * Redux Store Configuration
 * - Manages global application state for accounts and transfers.
 * - Uses Redux Toolkit for better developer experience.
 */
export const store = configureStore({
  reducer: {
    accounts: accountReducer, // Manages bank accounts state
    transfer: transferReducer, // Manages fund transfers state
  },
});

/**
 * RootState Type
 * - Provides TypeScript support for Redux state.
 * - Allows components to correctly infer state types when using `useSelector`.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * AppDispatch Type
 * - Defines the dispatch type for better type inference in components.
 */
export type AppDispatch = typeof store.dispatch;
