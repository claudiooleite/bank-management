const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

// ✅ Enable CORS for frontend access
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ==========================================
   ✅ Mock Data: Accounts & Exchange Rates
=========================================== */

// ✅ Mock Bank Accounts Data
let accounts = [
  {
    ownerId: uuidv4(),
    ownerName: "Bill Gates",
    currency: "EUR",
    balance: 300000,
  },
  {
    ownerId: uuidv4(),
    ownerName: "Tom Hardy",
    currency: "GBP",
    balance: 700000,
  },
  {
    ownerId: uuidv4(),
    ownerName: "Christian Bale",
    currency: "EUR",
    balance: 250000,
  },
  {
    ownerId: uuidv4(),
    ownerName: "Sophia Lee",
    currency: "GBP",
    balance: 450000,
  },
  {
    ownerId: uuidv4(),
    ownerName: "David Kim",
    currency: "GBP",
    balance: 600000,
  },
  {
    ownerId: uuidv4(),
    ownerName: "Emma Wilson",
    currency: "GBP",
    balance: 90000000,
  },
];

// ✅ Mock Exchange Rates (Base: 1 EUR)
const exchangeRates = {
  EUR: 1.0,
  GBP: 0.89,
};

/* ==========================================
   ✅ API Routes for Bank Account Management
=========================================== */

/**
 * ✅ Get All Accounts
 * @route GET /accounts
 */
app.get("/accounts", (req, res) => {
  res.json(accounts);
});

/**
 * ✅ Get a Single Account by ID
 * @route GET /accounts/:ownerId
 */
app.get("/accounts/:ownerId", (req, res) => {
  const { ownerId } = req.params;
  const account = accounts.find((acc) => acc.ownerId === ownerId);

  if (!account) {
    return res.status(404).json({ error: "Account not found" });
  }

  res.json(account);
});

/**
 * ✅ Create a New Account
 * @route POST /accounts
 */
app.post("/accounts", (req, res) => {
  const { ownerName, currency, balance } = req.body;

  if (!ownerName || !currency || balance == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newAccount = {
    ownerId: uuidv4(),
    ownerName,
    currency,
    balance: Number(balance),
  };

  accounts.push(newAccount);
  res.json(newAccount);
});

/**
 * ✅ Update an Existing Account
 * @route PUT /accounts/:ownerId
 */
app.put("/accounts/:ownerId", (req, res) => {
  const { ownerId } = req.params;
  const { ownerName, currency, balance } = req.body;

  const accountIndex = accounts.findIndex((acc) => acc.ownerId === ownerId);
  if (accountIndex === -1) {
    return res.status(404).json({ error: "Account not found" });
  }

  // ✅ Update account details
  accounts[accountIndex] = {
    ...accounts[accountIndex],
    ownerName,
    currency,
    balance: Number(balance),
  };

  res.json(accounts[accountIndex]);
});

/**
 * ✅ Delete an Account
 * @route DELETE /accounts/:ownerId
 */
app.delete("/accounts/:ownerId", (req, res) => {
  const { ownerId } = req.params;

  const accountIndex = accounts.findIndex((acc) => acc.ownerId === ownerId);
  if (accountIndex === -1) {
    return res.status(404).json({ error: "Account not found" });
  }

  accounts.splice(accountIndex, 1);
  res.json({ message: "Account deleted successfully" });
});

/* ==========================================
   ✅ Transfer Funds Between Accounts
=========================================== */

/**
 * ✅ Transfer Funds
 * @route POST /transfer
 */
app.post("/transfer", (req, res) => {
  let { fromAccountId, toAccountId, amount } = req.body;

  if (!fromAccountId || !toAccountId || amount == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Convert amount to cents for precision
  amount = amount * 100;

  const fromAccount = accounts.find((acc) => acc.ownerId === fromAccountId);
  const toAccount = accounts.find((acc) => acc.ownerId === toAccountId);

  if (!fromAccount || !toAccount) {
    return res.status(400).json({ error: "Invalid accounts" });
  }

  if (fromAccount.balance < amount) {
    return res.status(400).json({ error: "Insufficient funds" });
  }

  let convertedAmount = amount;

  // ✅ Currency Conversion if Needed
  if (fromAccount.currency !== toAccount.currency) {
    const conversionRate =
      exchangeRates[toAccount.currency] / exchangeRates[fromAccount.currency];
    convertedAmount = amount * conversionRate;
  }

  // ✅ Deduct from sender and add to receiver
  fromAccount.balance -= amount;
  toAccount.balance += convertedAmount;

  res.json({ success: true, fromAccount, toAccount });
});

/* ==========================================
   ✅ Default Fallback Route
=========================================== */
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

/* ==========================================
   ✅ Start Server
=========================================== */
const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
