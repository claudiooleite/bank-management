const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

// Enable CORS for frontend access
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock Accounts Data
var accounts = [
  {
    ownerId: uuidv4(),
    ownerName: "Bill Gates",
    currency: "EUR",
    balance: 3000,
  },
  {
    ownerId: uuidv4(),
    ownerName: "Tom Hardy",
    currency: "GBP",
    balance: 7000,
  },
  {
    ownerId: uuidv4(),
    ownerName: "Christian Bale",
    currency: "EUR",
    balance: 2500,
  },
  {
    ownerId: uuidv4(),
    ownerName: "Sophia Lee",
    currency: "GBP",
    balance: 4500,
  },
  {
    ownerId: uuidv4(),
    ownerName: "David Kim",
    currency: "GBP",
    balance: 6000,
  },
  {
    ownerId: uuidv4(),
    ownerName: "Emma Wilson",
    currency: "GBP",
    balance: 900000,
  },
];

// Mock Exchange Rates (1 EUR base)
const exchangeRates = {
  EUR: 1.0,
  GBP: 0.89,
};

app.get("/accounts", (req, res, next) => {
  res.json(accounts);
});

// Search functionality
app.get("/accounts/:ownerId", (req, res, next) => {
  const requestId = req.params.ownerId;

  const account = accounts.find((a) => a.ownerId === requestId);
  if (account == null) {
    res.status(404).send("not found");
    return;
  }
  res.json(account);
});

// Create Account Functionality
app.post("/accounts", (req, res) => {
  const { ownerName, currency, balance } = req.body;

  const newAccount = {
    ownerId: uuidv4(), // Generate new UUID
    ownerName,
    currency,
    balance: Number(balance), // Ensure balance is a number
  };

  accounts.push(newAccount);
  res.json(newAccount);
});

// Update Account Functionality
app.put("/accounts/:ownerId", (req, res) => {
  const { ownerId } = req.params;
  const { ownerName, currency, balance } = req.body;

  const accountIndex = accounts.findIndex((acc) => acc.ownerId === ownerId);
  if (accountIndex === -1) {
    return res.status(404).json({ error: "Account not found" });
  }

  accounts[accountIndex] = {
    ...accounts[accountIndex],
    ownerName,
    currency,
    balance: Number(balance),
  };
  res.json(accounts[accountIndex]);
});

// Delete Account Functionality
app.delete("/accounts/:ownerId", (req, res) => {
  const { ownerId } = req.params;

  const accountIndex = accounts.findIndex((acc) => acc.ownerId === ownerId);
  if (accountIndex === -1) {
    return res.status(404).json({ error: "Account not found" });
  }

  accounts.splice(accountIndex, 1);
  res.json({ message: "Account deleted successfully" });
});

app.get("/", (req, res, next) => {
  res.status(404).send("");
});

// Transfer Funds Functionality
app.post("/transfer", (req, res) => {
  const { fromAccountId, toAccountId, amount } = req.body;
  
  const fromAccount = accounts.find(acc => acc.ownerId === fromAccountId);
  const toAccount = accounts.find(acc => acc.ownerId === toAccountId);

  if (!fromAccount || !toAccount) {
    return res.status(400).json({ error: "Invalid accounts" });
  }

  if (fromAccount.balance < amount) {
    return res.status(400).json({ error: "Insufficient funds" });
  }

  let convertedAmount = amount;

  if (fromAccount.currency !== toAccount.currency) {
    const conversionRate = exchangeRates[toAccount.currency] / exchangeRates[fromAccount.currency];
    convertedAmount = amount * conversionRate;
  }

  fromAccount.balance -= amount;
  toAccount.balance += convertedAmount;

  res.json({ success: true, fromAccount, toAccount });
});

const port = 9000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
