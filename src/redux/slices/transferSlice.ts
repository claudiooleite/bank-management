import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAccounts } from "./accountSlice"; 

// Transfer type definition
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

const initialState: TransferState = {
  transfers: [],
  status: "idle",
  error: null,
};

// Async Thunk to make a transfer
export const makeTransfer = createAsyncThunk(
  "transfers/makeTransfer",
  async (transferData: Transfer, { dispatch, rejectWithValue }) => {
    try {
      console.log("Sending Transfer to API:", transferData); // ✅ Debugging API Request
      const response = await fetch("http://localhost:9000/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transferData),
      });

      if (!response.ok) {
        throw new Error(`Transfer failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Transfer API Response:", result); // ✅ Debugging API Response

      // ✅ After a successful transfer, fetch updated account balances
      dispatch(fetchAccounts());

      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Redux Slice
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
