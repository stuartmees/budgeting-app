# Budgeting App

A personal budget management web application for tracking monthly and weekly budgets with real-time spending tracking.

## Tech Stack

- **Frontend:** React TypeScript + Redux (in `/web`)
- **Backend:** .NET 8 API with Dapper (in `/Server`)
- **Database:** PostgreSQL
- **Authentication:** Okta (OAuth 2.0 / OIDC)

## Project Structure

```
budgeting-app/
├── web/              # React TypeScript frontend
└── Server/           # .NET API backend
```

## Getting Started

### Backend

```bash
cd Server
dotnet restore
dotnet run
```

Set up local secrets:
```bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "<your-postgres-connection-string>"
```

### Frontend

```bash
cd web
npm install
npm run dev
```

## Features

- Monthly budget management (income & outgoings)
- Flexible weekly budget allocation
- Real-time spending tracking
- Historical budget viewing
