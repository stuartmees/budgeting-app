# Budgeting App

A personal budget management web application for tracking monthly and weekly budgets with real-time spending tracking.

## Quick Setup Guide

### Automated Setup (Recommended)

```bash
./setup.sh
```

This script installs dependencies, creates the database, and prompts for secrets.

### Manual Setup

#### Prerequisites
- Node.js (v18+)
- .NET 8 SDK
- PostgreSQL 16

#### 1. Clone and Install

```bash
git clone <repo-url>
cd budgeting-app

# Frontend
cd web && npm install

# Backend
cd ../Server && dotnet restore
```

#### 2. Database Setup

```bash
# Create PostgreSQL database and user
psql -d postgres -c "CREATE USER budgeting_app_admin WITH PASSWORD '<password>';"
createdb budgeting_app
psql -d postgres -c "GRANT ALL PRIVILEGES ON DATABASE budgeting_app TO budgeting_app_admin;"

# Run migrations
psql -d budgeting_app -f Server/Sql/001_InitialSchema.sql
psql -d budgeting_app -f Server/Sql/002_UserInvites.sql

# Grant table permissions
psql -d budgeting_app -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO budgeting_app_admin; GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO budgeting_app_admin; GRANT ALL ON SCHEMA public TO budgeting_app_admin;"
```

#### 3. Configure Secrets

Get the following from the app developer admin or create your own Auth0 tenant:
- Auth0 Domain, Client ID, Client Secret
- Database password

**Backend secrets:**
```bash
cd Server
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Database=budgeting_app;Username=budgeting_app_admin;Password=<password>"
dotnet user-secrets set "Auth0:Domain" "<domain>.auth0.com"
dotnet user-secrets set "Auth0:ClientId" "<client-id>"
dotnet user-secrets set "Auth0:ClientSecret" "<client-secret>"
```

**Frontend env:** Copy `web/.env.example` to `web/.env` and fill in values:
```
VITE_AUTH0_DOMAIN=<domain>.auth0.com
VITE_AUTH0_CLIENT_ID=<client-id>
```

#### 4. Run

```bash
# Terminal 1 - Backend
cd Server && dotnet run

# Terminal 2 - Frontend
cd web && npm run dev
```

App runs at http://localhost:5173

---

## Tech Stack

- **Frontend:** React TypeScript + Redux (in `/web`)
- **Backend:** .NET 8 API with Dapper (in `/Server`)
- **Database:** PostgreSQL
- **Authentication:** Auth0 (OAuth 2.0 / OIDC)

## Invite-Only Registration

This app uses invite-only registration. Users cannot sign up on their own—they must receive an invite from an administrator, validate the invite code on the app's RegisterPage, and then complete sign-up through Auth0's widget.

### Why invite-only?

The app is designed for controlled access. Only invited users should be able to create accounts, preventing random sign-ups and keeping the user base intentional.

### The challenge

Auth0 must have sign-ups enabled for the registration flow to work. But this creates a problem: anyone could bypass the app's RegisterPage and sign up directly through Auth0's hosted widget, circumventing the invite requirement.

### The solution: Pre-User Registration Action

An Auth0 Action runs before every sign-up attempt and verifies the user came through the app's invite flow:

1. User receives an invite with a unique code
2. User enters the code on RegisterPage → backend validates it, sets `code_validated` timestamp, returns the invite `id`
3. Frontend redirects to Auth0 with `xt-invite_id` as a custom parameter
4. Auth0's Pre-User Registration Action calls `GET /api/auth/user-invites/{id}/is-pending`
5. Backend checks: invite exists, not used, `code_validated` is set and within 15 minutes
6. If valid → registration proceeds; if not → Auth0 blocks the sign-up

**Result:** Users who go through RegisterPage with a valid invite can register. Users who try to sign up directly through Auth0 are blocked.

**Auth0 Dashboard location:** Actions → Flows → Pre User Registration
**Action source:** `auth0/actions/preUserRegistration/checkUserInvite.js`

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
- **Auth0** handles authentication token signing/validation
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
