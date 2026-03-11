-- Initial schema for Budgeting App

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    okta_id VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    display_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE months (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'future' CHECK (status IN ('future', 'current', 'past')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_months_user_id ON months(user_id);

CREATE TABLE monthly_incomes (
    id SERIAL PRIMARY KEY,
    month_id INT NOT NULL REFERENCES months(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    amount DECIMAL(18, 2) NOT NULL,
    is_recurring BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX idx_monthly_incomes_month_id ON monthly_incomes(month_id);

CREATE TABLE monthly_outgoings (
    id SERIAL PRIMARY KEY,
    month_id INT NOT NULL REFERENCES months(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    amount DECIMAL(18, 2) NOT NULL,
    is_recurring BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX idx_monthly_outgoings_month_id ON monthly_outgoings(month_id);

CREATE TABLE weeks (
    id SERIAL PRIMARY KEY,
    month_id INT NOT NULL REFERENCES months(id) ON DELETE CASCADE,
    week_number INT NOT NULL,
    start_date DATE NOT NULL,
    budget DECIMAL(18, 2) NOT NULL,
    notes VARCHAR(500)
);

CREATE INDEX idx_weeks_month_id ON weeks(month_id);

CREATE TABLE week_spends (
    id SERIAL PRIMARY KEY,
    week_id INT NOT NULL REFERENCES weeks(id) ON DELETE CASCADE,
    description VARCHAR(500) NOT NULL,
    amount DECIMAL(18, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_week_spends_week_id ON week_spends(week_id);

CREATE TABLE user_invites (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    invite_code VARCHAR(255) NOT NULL,
    created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    used BOOLEAN NOT NULL DEFAULT FALSE,
    code_validated TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE INDEX idx_user_invites_email ON user_invites(email);
