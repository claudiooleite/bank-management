const express = require("express");
// const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

// Enable CORS for frontend access
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock Accounts Data
var accounts = [
  {
    ownerId: "ac6c018e-d920-4795-ac79-69cc2061529b",
    currency: "USD",
    balance: 5000,
  },
  { ownerId: uuidv4(), currency: "EUR", balance: 3000 },
];

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

// Search Create Account Functionality
app.post("/accounts", (req, res, next) => {
  // accept request body
  const requestBody = req.body;
  // maybe you need to validate - optional for now

  console.log({ requestBody });
  console.log(req.body);

  // store a new account
  const savedAccount = {
    ownerId: uuidv4(),
    currency: requestBody.currency,
    name: requestBody.name,
  };
  console.log(savedAccount);
  accounts.push(savedAccount);

  // return new account
  res.json(savedAccount);
});

// Update Account Functionality
app.put("/accounts/:ownerId", (req, res) => {
  const { ownerId } = req.params;
  const { currency, balance } = req.body;

  const accountIndex = accounts.findIndex((acc) => acc.ownerId === ownerId);
  if (accountIndex === -1) {
    return res.status(404).json({ error: "Account not found" });
  }

  // Update account details
  accounts[accountIndex] = { ...accounts[accountIndex], currency, balance };
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

const port = 9000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
