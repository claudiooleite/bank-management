import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Account type
interface Account {
  ownerId: string;
  ownerName: string;
  currency: string;
  balance: number;
}

export interface AccountsState {
  accounts: Account[];
  status: "idle" | "loading" | "failed";
}

export const initialState: AccountsState = {
  accounts: [],
  status: "idle",
};

// Async Thunks for API Calls

// Fetch all accounts
export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async () => {
    const response = await fetch("http://localhost:9000/accounts");
    return response.json();
  },
);

// Add a new account
export const addAccount = createAsyncThunk(
  "accounts/addAccount",
  async (newAccount: Omit<Account, "ownerId">) => {
    const response = await fetch("http://localhost:9000/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAccount),
    });
    return response.json();
  },
);

// Update an account
export const updateAccount = createAsyncThunk(
  "accounts/updateAccount",
  async (account: Account) => {
    const response = await fetch(
      `http://localhost:9000/accounts/${account.ownerId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(account),
      },
    );
    return response.json();
  },
);

// Delete an account
export const deleteAccount = createAsyncThunk(
  "accounts/deleteAccount",
  async (ownerId: string) => {
    await fetch(`http://localhost:9000/accounts/${ownerId}`, {
      method: "DELETE",
    });
    return ownerId;
  },
);

// Redux Slice
const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.accounts = action.payload;
      })
      .addCase(addAccount.fulfilled, (state, action) => {
        state.accounts.push(action.payload);
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        const index = state.accounts.findIndex(
          (acc) => acc.ownerId === action.payload.ownerId,
        );
        if (index !== -1) {
          state.accounts[index] = action.payload;
        }
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.accounts = state.accounts.filter(
          (acc) => acc.ownerId !== action.payload,
        );
      });
  },
});

export default accountsSlice.reducer;
