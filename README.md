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

#### What are secrets?

Secrets are sensitive configuration values like database connection strings, API keys, and OAuth client secrets. They must never be committed to git.

This project stores secrets as **environment variables** injected at runtime:
- **Local:** .NET User Secrets (stored at `~/.microsoft/usersecrets/`, outside the repo)
- **Production:** Fly.io secrets (`fly secrets set`) and Vercel environment variables

#### Why not a KMS (e.g., GCP KMS)?

A Key Management Service like GCP KMS is designed for **cryptographic key management** - generating, storing, and rotating encryption keys used to encrypt/decrypt data at the application level.

This app doesn't need a separate KMS because:
- **Okta** handles authentication token signing/validation
- **PostgreSQL** handles data-at-rest encryption
- **HTTPS** handles transport encryption

For simple secret storage (connection strings, API keys), environment variables via Fly.io/Vercel are sufficient and simpler to manage.

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
