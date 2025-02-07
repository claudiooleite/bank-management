import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// ✅ Account Type Definition
interface Account {
  ownerId: string;
  ownerName: string;
  currency: string;
  balance: number;
}

// ✅ Initial State Definition
export interface AccountsState {
  accounts: Account[];
  status: "idle" | "loading" | "failed";
}

export const initialState: AccountsState = {
  accounts: [],
  status: "idle",
};

/* ==========================================
   ✅ Async Thunks for API Calls
=========================================== */

/**
 * ✅ Fetch All Accounts from the Backend API
 */
export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async () => {
    const response = await fetch("http://localhost:9000/accounts");
    return response.json();
  }
);

/**
 * ✅ Add a New Account
 */
export const addAccount = createAsyncThunk(
  "accounts/addAccount",
  async (newAccount: Omit<Account, "ownerId">) => {
    const response = await fetch("http://localhost:9000/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAccount),
    });
    return response.json();
  }
);

/**
 * ✅ Update an Existing Account
 */
export const updateAccount = createAsyncThunk(
  "accounts/updateAccount",
  async (account: Account) => {
    const response = await fetch(
      `http://localhost:9000/accounts/${account.ownerId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(account),
      }
    );
    return response.json();
  }
);

/**
 * ✅ Delete an Account
 */
export const deleteAccount = createAsyncThunk(
  "accounts/deleteAccount",
  async (ownerId: string) => {
    await fetch(`http://localhost:9000/accounts/${ownerId}`, {
      method: "DELETE",
    });
    return ownerId;
  }
);

/* ==========================================
   ✅ Redux Slice for Account Management
=========================================== */
const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.accounts = action.payload.map((account: Account) => ({
          ...account,
          balance: account.balance / 100, // Convert balance from cents to currency format
        }));
      })
      .addCase(addAccount.fulfilled, (state, action) => {
        state.accounts.push(action.payload);
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        const index = state.accounts.findIndex(
          (acc) => acc.ownerId === action.payload.ownerId
        );
        if (index !== -1) {
          state.accounts[index] = action.payload;
        }
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.accounts = state.accounts.filter(
          (acc) => acc.ownerId !== action.payload
        );
      });
  },
});

// ✅ Export Reducer
export default accountsSlice.reducer;
