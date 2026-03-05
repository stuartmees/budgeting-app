#!/bin/bash

# Budgeting App - Developer Setup Script
# Run this script to set up your local development environment

set -e

echo "=========================================="
echo "  Budgeting App - Developer Setup"
echo "=========================================="
echo ""

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

if ! command -v dotnet &> /dev/null; then
    echo "❌ .NET SDK not found. Please install .NET 8 SDK"
    exit 1
fi

if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL not found. Please install PostgreSQL 16"
    exit 1
fi

echo "✅ All prerequisites found"
echo ""

# Install dependencies
echo "Installing dependencies..."
echo ""

echo "→ Installing frontend dependencies..."
cd web && npm install
cd ..

echo "→ Installing backend dependencies..."
cd Server && dotnet restore
cd ..

echo "✅ Dependencies installed"
echo ""

# Database setup
echo "=========================================="
echo "  Database Setup"
echo "=========================================="
echo ""

read -p "Enter a password for the budgeting_app_admin database user: " DB_PASSWORD
echo ""

echo "→ Creating database user..."
psql -d postgres -c "CREATE USER budgeting_app_admin WITH PASSWORD '$DB_PASSWORD';" 2>/dev/null || echo "  (User may already exist, continuing...)"

echo "→ Creating database..."
createdb budgeting_app 2>/dev/null || echo "  (Database may already exist, continuing...)"

echo "→ Granting database privileges..."
psql -d postgres -c "GRANT ALL PRIVILEGES ON DATABASE budgeting_app TO budgeting_app_admin;"

echo "→ Running migrations..."
psql -d budgeting_app -f Server/Sql/001_InitialSchema.sql
psql -d budgeting_app -f Server/Sql/002_SignUpInvites.sql

echo "→ Granting table privileges..."
psql -d budgeting_app -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO budgeting_app_admin; GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO budgeting_app_admin; GRANT ALL ON SCHEMA public TO budgeting_app_admin;"

echo "→ Transferring table ownership..."
psql -d budgeting_app -c "ALTER TABLE users OWNER TO budgeting_app_admin; ALTER TABLE months OWNER TO budgeting_app_admin; ALTER TABLE monthly_incomes OWNER TO budgeting_app_admin; ALTER TABLE monthly_outgoings OWNER TO budgeting_app_admin; ALTER TABLE weeks OWNER TO budgeting_app_admin; ALTER TABLE week_spends OWNER TO budgeting_app_admin; ALTER TABLE sign_up_invites OWNER TO budgeting_app_admin;"
psql -d budgeting_app -c "ALTER SEQUENCE users_id_seq OWNER TO budgeting_app_admin; ALTER SEQUENCE months_id_seq OWNER TO budgeting_app_admin; ALTER SEQUENCE monthly_incomes_id_seq OWNER TO budgeting_app_admin; ALTER SEQUENCE monthly_outgoings_id_seq OWNER TO budgeting_app_admin; ALTER SEQUENCE weeks_id_seq OWNER TO budgeting_app_admin; ALTER SEQUENCE week_spends_id_seq OWNER TO budgeting_app_admin; ALTER SEQUENCE sign_up_invites_id_seq OWNER TO budgeting_app_admin;"

echo "✅ Database setup complete"
echo ""

# Secrets setup
echo "=========================================="
echo "  Secrets Setup"
echo "=========================================="
echo ""
echo "Get these values from the app developer admin or create your own Auth0 tenant."
echo ""

read -p "Auth0 Domain (e.g., dev-xxxxx.us.auth0.com): " AUTH0_DOMAIN
read -p "Auth0 Client ID: " AUTH0_CLIENT_ID
read -p "Auth0 Client Secret: " AUTH0_CLIENT_SECRET
echo ""

echo "→ Setting backend secrets..."
cd Server
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Database=budgeting_app;Username=budgeting_app_admin;Password=$DB_PASSWORD"
dotnet user-secrets set "Auth0:Domain" "$AUTH0_DOMAIN"
dotnet user-secrets set "Auth0:ClientId" "$AUTH0_CLIENT_ID"
dotnet user-secrets set "Auth0:ClientSecret" "$AUTH0_CLIENT_SECRET"
cd ..

echo "→ Setting frontend environment..."
cat > web/.env << EOF
VITE_AUTH0_DOMAIN=$AUTH0_DOMAIN
VITE_AUTH0_CLIENT_ID=$AUTH0_CLIENT_ID
VITE_API_URL=http://localhost:5225
EOF

echo "✅ Secrets configured"
echo ""

echo "=========================================="
echo "  Setup Complete!"
echo "=========================================="
echo ""
echo "To run the app:"
echo ""
echo "  Terminal 1 (Backend):"
echo "    cd Server && dotnet run"
echo ""
echo "  Terminal 2 (Frontend):"
echo "    cd web && npm run dev"
echo ""
echo "App will be available at http://localhost:5173"
echo ""
