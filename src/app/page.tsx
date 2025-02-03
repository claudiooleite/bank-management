"use client";

import { useTranslations } from "next-intl";

import AccountList from "../components/AccountList";
import AccountForm from "../components/AccountForm";
import TransferForm from "../components/TransferForm";
import Card from "@/components/Card";

export default function Home() {
  const t = useTranslations();

  return (
    <main className="flex flex-col items-center p-4 gap-3 max-w-7xl w-full">
      <h1 className="text-3xl font-bold">{t("title")}</h1>

      {/* Create Account Form */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Card>
          <AccountForm/>
        </Card>

        {/* Transfer Funds Form */}
        <Card>
          <TransferForm />
        </Card>
      </div>

      {/* Account List */}
      <Card>
        <AccountList />
      </Card>

    </main>
  );
}
