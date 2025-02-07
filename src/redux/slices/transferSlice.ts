import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAccounts } from "./accountSlice"; 

// ✅ Mock Exchange Rates (for currency conversion)
const exchangeRates: Record<string, number> = {
  EUR: 1.0,
  GBP: 0.89,
};

// ✅ Transfer type definition
interface Transfer {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
}

interface TransferState {
  transfers: Transfer[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

// ✅ Initial State
const initialState: TransferState = {
  transfers: [],
  status: "idle",
  error: null,
};

/**
 * ✅ Async Thunk: Handles money transfers between accounts.
 * - Validates accounts and funds.
 * - Converts currency if needed.
 * - Sends the transfer request to the backend.
 */
export const makeTransfer = createAsyncThunk(
  "transfers/makeTransfer",
  async (transferData: Transfer, { dispatch, getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const accounts = state.accounts.accounts;

      // ✅ Find sender & receiver accounts
      const fromAccount = accounts.find((acc: any) => acc.ownerId === transferData.fromAccountId);
      const toAccount = accounts.find((acc: any) => acc.ownerId === transferData.toAccountId);

      if (!fromAccount || !toAccount) {
        return rejectWithValue("Invalid accounts");
      }

      // ✅ Check if sender has enough funds
      if (fromAccount.balance < transferData.amount) {
        return rejectWithValue("Insufficient funds");
      }

      let finalAmount = transferData.amount;

      // ✅ Handle Currency Conversion
      if (fromAccount.currency !== toAccount.currency) {
        const conversionRate = exchangeRates[toAccount.currency] / exchangeRates[fromAccount.currency];
        const convertedAmount = transferData.amount * conversionRate;

        // Confirm conversion before proceeding
        const userConfirmed = window.confirm(
          `Exchange Rate: 1 ${fromAccount.currency} = ${conversionRate.toFixed(2)} ${toAccount.currency}\n` +
          `Converted Amount: ${convertedAmount.toFixed(2)} ${toAccount.currency}\n\n` +
          `Do you want to proceed with this transfer?`
        );

        if (!userConfirmed) {
          return rejectWithValue("Transfer cancelled by user");
        }

        finalAmount = convertedAmount;
      }

      // ✅ Send transfer request to backend
      const response = await fetch("http://localhost:9000/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...transferData, amount: finalAmount }),
      });

      if (!response.ok) {
        throw new Error(`Transfer failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);

      // ✅ Refresh account balances after transfer
      dispatch(fetchAccounts()); 

      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Redux Slice for Transfer Management
const transferSlice = createSlice({
  name: "transfers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeTransfer.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(makeTransfer.fulfilled, (state, action) => {
        state.status = "idle";
        state.transfers.push(action.payload);
      })
      .addCase(makeTransfer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default transferSlice.reducer;
