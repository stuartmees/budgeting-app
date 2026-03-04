CREATE TABLE sign_up_invites (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    code VARCHAR(64) NOT NULL,
    created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    used BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_sign_up_invites_email ON sign_up_invites(email);

-- Cron job query (daily): delete all invites older than 15 days
-- DELETE FROM sign_up_invites WHERE created < NOW() - INTERVAL '15 days';
