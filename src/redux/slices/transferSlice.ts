import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Transfer {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  currency: string;
}

interface TransferState {
  transfers: Transfer[];
}

const initialState: TransferState = {
  transfers: [],
};

const transferSlice = createSlice({
  name: "transfers",
  initialState,
  reducers: {
    makeTransfer: (state, action: PayloadAction<Transfer>) => {
      state.transfers.push(action.payload);
    },
  },
});

export const { makeTransfer } = transferSlice.actions;
export default transferSlice.reducer;
