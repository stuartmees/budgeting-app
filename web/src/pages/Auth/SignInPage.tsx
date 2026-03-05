import { useAuth0 } from '@auth0/auth0-react';
import { Link, useSearchParams } from 'react-router-dom';

export default function SignInPage() {
  const { loginWithRedirect } = useAuth0();
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  const handleSignIn = () => {
    // Force login screen only - no signup option shown
    // New users must go through RegisterPage with invite
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'login',
      },
    });
  };

  return (
    <div>
      <h1>Sign In</h1>
      <p>Sign in to your account.</p>

      {error === 'not-found' && (
        <p style={{ color: 'red' }}>
          Sorry, can't match those details to a Budgeteer account!
        </p>
      )}

      <button onClick={handleSignIn}>Sign In with Auth0</button>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <p>
        <Link to="/">Back</Link>
      </p>
    </div>
  );
}
