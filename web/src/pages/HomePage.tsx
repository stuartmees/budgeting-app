import { useAuth0 } from '@auth0/auth0-react';

export default function HomePage() {
  const { user, logout } = useAuth0();

  return (
    <div>
      <h1>Welcome, {user?.name || 'User'}!</h1>
      <p>Email: {user?.email}</p>
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>
    </div>
  );
}
