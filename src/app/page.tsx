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
    </main>
  );
}
