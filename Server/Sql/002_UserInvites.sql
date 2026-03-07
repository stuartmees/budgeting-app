-- Migration: Rename sign_up_invites to user_invites, rename code to invite_code, add code_validated

-- Rename table
ALTER TABLE sign_up_invites RENAME TO user_invites;

-- Rename column
ALTER TABLE user_invites RENAME COLUMN code TO invite_code;

-- Add new column
ALTER TABLE user_invites ADD COLUMN code_validated TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Rename index
ALTER INDEX idx_sign_up_invites_email RENAME TO idx_user_invites_email;
