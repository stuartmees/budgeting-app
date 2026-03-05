import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

export default function SignInPage() {
  const { loginWithRedirect } = useAuth0();

  const handleSignIn = () => {
    loginWithRedirect();
  };

  return (
    <div>
      <h1>Sign In</h1>
      <p>Sign in to your account.</p>

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
