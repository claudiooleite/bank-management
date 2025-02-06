import reducer, { addAccount, updateAccount, deleteAccount, AccountsState } from "../redux/slices/accountSlice";


describe("accountSlice", () => {
  const initialState: AccountsState = {
    accounts: [
      { ownerId: "1", ownerName: "John Doe", currency: "EUR", balance: 5000 },
      { ownerId: "2", ownerName: "Jane Smith", currency: "GBP", balance: 3000 },
    ],
    status: "idle",
  };

  it("should handle adding a new account", () => {
    const newAccount = {
      ownerId: "3",
      ownerName: "Alice",
      currency: "USD",
      balance: 2000,
    };

    const nextState = reducer(initialState, addAccount.fulfilled(newAccount, "", newAccount));
    expect(nextState.accounts).toHaveLength(3);
    expect(nextState.accounts[2]).toEqual(newAccount);
  });

  it("should handle updating an account", () => {
    const updatedAccount = {
      ownerId: "1",
      ownerName: "John Doe Updated",
      currency: "EUR",
      balance: 6000,
    };

    const nextState = reducer(initialState, updateAccount.fulfilled(updatedAccount, "", updatedAccount));
    expect(nextState.accounts[0].ownerName).toBe("John Doe Updated");
    expect(nextState.accounts[0].balance).toBe(6000);
  });

  it("should handle deleting an account", () => {
    const nextState = reducer(initialState, deleteAccount.fulfilled("1", "", "1"));
    expect(nextState.accounts).toHaveLength(1);
    expect(nextState.accounts.find((acc) => acc.ownerId === "1")).toBeUndefined();
  });
});
