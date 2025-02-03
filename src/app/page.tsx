"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import AccountList from "../components/AccountList";
import AccountForm from "../components/AccountForm";
import TransferForm from "../components/TransferForm";
import Card from "@/components/Card";

export default function Home() {
  const t = useTranslations();

  return (
    <main className="flex flex-col items-center p-4 gap-3">
      <h1>{t("title")}</h1>

      {/* Create Account Form */}
      <Card>
        <AccountForm/>
      </Card>

      {/* Transfer Funds Form */}
      <Card>
        <TransferForm />
      </Card>

      {/* Account List */}
      <Card>
        <AccountList />
      </Card>

    </main>
  );
}
