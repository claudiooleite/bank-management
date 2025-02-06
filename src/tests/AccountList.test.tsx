import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../redux/slices/accountSlice";
import AccountList from "../components/AccountList";
import { NextIntlClientProvider } from "next-intl";
import { AccountsState } from "../redux/slices/accountSlice";

// Mock Translations
const messages = {
  en: {
    bankAccount: "Bank Accounts",
    ownerName: "Owner Name",
    currency: "Currency",
    balance: "Balance",
    actions: "Actions",
    searchPlaceholder: "Search...",
  },
};

// Mock Redux Store
const preloadedState: { accounts: AccountsState } = {
  accounts: {
    accounts: [
      { ownerId: "1", ownerName: "John Doe", currency: "EUR", balance: 5000 },
      { ownerId: "2", ownerName: "Jane Smith", currency: "GBP", balance: 3000 },
    ],
    status: "idle",
  },
};

const mockStore = configureStore({
  reducer: { accounts: accountReducer },
  preloadedState,
});

// Render with Providers
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider messages={messages.en} locale="en">
      <Provider store={mockStore}>{component}</Provider>
    </NextIntlClientProvider>
  );
};

describe("AccountList Component", () => {
  it("should display account list", () => {
    renderWithProviders(<AccountList />);
    
    // ✅ Ensure at least one "John Doe" and "Jane Smith" appear
    expect(screen.getAllByText("John Doe").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Jane Smith").length).toBeGreaterThan(0);
  });

  it("should filter accounts based on search input", async () => {
    renderWithProviders(<AccountList />);
    
    const searchInput = screen.getByPlaceholderText(messages.en.searchPlaceholder);
    
    fireEvent.change(searchInput, { target: { value: "John" } });

    // ✅ Ensure at least one "John Doe" appears
    expect(screen.getAllByText("John Doe").length).toBeGreaterThan(0);

    // ✅ Ensure "Jane Smith" is fully filtered out
    expect(screen.queryAllByText("Jane Smith").length).toBe(0);
  });

  it("should show Edit button and update account name", async () => {
    renderWithProviders(<AccountList />);
    
    // ✅ Get all "Edit" buttons and click the first one in the desktop table
    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);

    // ✅ Wait for the input field to appear
    await waitFor(() => {
        expect(screen.getByPlaceholderText(messages.en.ownerName)).toBeInTheDocument();
    });

    // ✅ Find the input field
    const nameInput = screen.getByPlaceholderText(messages.en.ownerName);

    // ✅ Simulate typing a new name
    fireEvent.change(nameInput, { target: { value: "Updated Name" } });

    // ✅ Ensure the input has the new value
    expect(nameInput).toHaveValue("Updated Name");
  });
});
