const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const API = {
  USERS: `${API_BASE_URL}/api/users`,
  AUTH_USER_INVITES_VALIDATION: `${API_BASE_URL}/api/auth/user-invites/validation`,
  AUTH_USERS_LOOKUP: `${API_BASE_URL}/api/auth/users/lookup`,
};

export const { USERS, AUTH_USER_INVITES_VALIDATION, AUTH_USERS_LOOKUP } = API;
