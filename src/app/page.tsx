"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import AccountList from "../components/AccountList";
import AccountForm from "../components/AccountForm";
import TransferForm from "../components/TransferForm";
import Card from "@/components/Card";

export default function Home() {
  const t = useTranslations();
  const [editingAccount, setEditingAccount] = useState(null);

  return (
    <main className="flex flex-col w-screen">
      <h1>{t("title")}</h1>

      <Card>
        <AccountForm
          existingAccount={editingAccount}
          clearEdit={() => setEditingAccount(null)}
        />
      </Card>

      <Card>
        <TransferForm />
      </Card>

      <Card>
        <AccountList onEdit={setEditingAccount} />
      </Card>

      <h1 className="text-4xl font-bold text-blue-700">Tailwind is Working!</h1>
      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
        Click Me
      </button>
    </main>
  );
}
