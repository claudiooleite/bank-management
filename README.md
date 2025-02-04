This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Local development

To run the project locally you have to run both the front-end application and the backend API.

To start the application

```bash
npm install
npm run dev
```

To start the backend API

```bash
cd src/api
npm install
npm run dev
```

case port in use
netstat -ano | findstr :3000

              <PID>
taskkill /PID 15524 /F
