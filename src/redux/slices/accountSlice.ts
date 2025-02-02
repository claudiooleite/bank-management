import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Account {
  id: number;
  ownerId: number;
  currency: string;
  balance: number;
}

interface AccountsState {
  accounts: Account[];
}

const initialState: AccountsState = {
  accounts: [
    { id: 1, ownerId: 1001, currency: "USD", balance: 5000 },
    { id: 2, ownerId: 1002, currency: "EUR", balance: 3000 },
  ],
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload);
    },
    updateAccount: (state, action: PayloadAction<Account>) => {
      const index = state.accounts.findIndex(
        (acc) => acc.id === action.payload.id,
      );
      if (index !== -1) {
        state.accounts[index] = action.payload;
      }
    },
    deleteAccount: (state, action: PayloadAction<number>) => {
      state.accounts = state.accounts.filter(
        (acc) => acc.id !== action.payload,
      );
    },
  },
});

export const { addAccount, updateAccount, deleteAccount } =
  accountsSlice.actions;
export default accountsSlice.reducer;
