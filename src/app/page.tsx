"use client";

import AccountList from "../components/AccountList";
import AccountForm from "../components/AccountForm";
import TransferForm from "../components/TransferForm";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  const [editingAccount, setEditingAccount] = useState(null);

  return (
    <main>
      <h1>{t("title")}</h1>
      <AccountForm
        existingAccount={editingAccount}
        clearEdit={() => setEditingAccount(null)}
      />
      <TransferForm />
      <AccountList onEdit={setEditingAccount} />
      <h1 className="text-4xl font-bold text-blue-700">Tailwind is Working!</h1>
      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
        Click Me
      </button>
    </main>
  );
}
