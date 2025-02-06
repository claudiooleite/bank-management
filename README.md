# **Bank Management Web App**

A **bank account management** web application built using **Next.js 15** with **TypeScript, Redux, and Tailwind CSS**. The project includes **account management, transactions, localization, editing and deleting accounts**.

## Features
- 🔹 **Manage Bank Accounts** (Create, Edit, Delete)
- 🔹 **Multi-currency Support**
- 🔹 **Localization** with `next-intl`
- 🔹 **Responsive UI** with Tailwind CSS
- 🔹 **State Management** using Redux Toolkit
- 🔹 **Unit Testing** using Jest

---

## Tech Stack
- **Frontend:** Next.js 15, React, TypeScript
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Backend:** Express Server (for mock API)

## ** Local Development**
To run this project locally, you need to start both the frontend application and the backend API.

## Getting Started

1️⃣ Clone the Repository
```bash
git clone https://github.com/claudiooleite/bank-management
cd project

2️⃣ Start the Frontend Application
```bash
npm install
npm run dev
The application will start at http://localhost:3000.

3️⃣ Start the Backend API
```bash
cd src/api
npm install
npm run dev

The backend API will be available at http://localhost:9000.

✅ Testing
This project includes unit tests using Jest and React Testing Library.

To run the tests:
```bash
npm run test

