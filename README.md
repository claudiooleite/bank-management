# Bank Management Web App

A **bank account management** web application built using **Next.js 15**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS**. This project includes account management, transactions, localization, and the ability to edit or delete accounts.

## Features

- **Manage Bank Accounts** (Create, Edit, Delete)
- **Multi-currency Support**
- **Localization** with `next-intl`
- **Responsive UI** with Tailwind CSS
- **State Management** using Redux Toolkit
- **Unit Testing** with Jest and React Testing Library

## Tech Stack

- **Frontend:** Next.js 15, React, TypeScript
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Backend:** Express.js (Mock API)

## Installation & Local Development

To run this project locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/claudiooleite/bank-management.git
cd bank-management
```

### 2. Start the Frontend Application
```bash
npm install
npm run dev
```
The frontend application will be available at http://localhost:3000.

### 3. Start the Backend API
```bash
cd src/api
npm install
npm run dev
```
The backend API will be available at http://localhost:9000.

## Running Tests
This project includes unit tests using Jest and React Testing Library.

To run the test suite:
```bash
npm run test
```

## License
This project is licensed under the MIT License.