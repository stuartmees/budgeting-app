import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// The shape of our user data
interface User {
  id: number;
  auth0Id: string;
  email: string;
  displayName: string | null;
  createdAt: string;
}

// The slice state - either a user or null
type UserState = User | null;

// Load initial state from sessionStorage (persists across page refresh)
const initialState: UserState = (() => {
  const stored = sessionStorage.getItem('currentUser');
  return stored ? JSON.parse(stored) : null;
})();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set the user (on login)
    setUser: (_state, action: PayloadAction<User>) => {
      return action.payload;
    },
    // Clear the user (on logout)
    clearUser: () => {
      return null;
    },
  },
});

// Export actions - use these with dispatch()
export const { setUser, clearUser } = userSlice.actions;

// Export reducer - used by the store
export default userSlice.reducer;
