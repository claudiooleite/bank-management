"use client";

import { useTranslations } from "next-intl";

import AccountList from "../components/AccountList";
import AccountForm from "../components/AccountForm";
import TransferForm from "../components/TransferForm";
import Card from "../components/Card";

/**
 * Home Page Component
 * - Displays account-related functionalities, including:
 *   - Creating a new bank account
 *   - Transferring funds
 *   - Listing all available accounts
 */
export default function Home() {
  // Initialize translation hook for internationalization
  const t = useTranslations();

  return (
    <main className="flex flex-col items-center p-4 gap-3 max-w-7xl w-full">
      {/* Page Title */}
      <h1 className="text-3xl font-bold">{t("title")}</h1>

      {/* Account Creation & Fund Transfer Section */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        {/* Account Creation Form */}
        <Card>
          <AccountForm />
        </Card>

        {/* Transfer Funds Form */}
        <Card>
          <TransferForm />
        </Card>
      </div>

      {/* Account List Section */}
      <Card>
        <AccountList />
      </Card>
    </main>
  );
}
