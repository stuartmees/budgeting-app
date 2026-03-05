import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function RegisterPage() {
  const { loginWithRedirect } = useAuth0();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');

  const handleValidateInvite = async () => {
    setError('');

    if (!displayName.trim()) {
      setError('Please enter your name');
      return;
    }

    try {
      const response = await fetch('/api/auth/validate-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: inviteCode }),
      });

      if (!response.ok) {
        setError('Invalid or expired invite code');
        return;
      }

      // Store registration data for after Auth0 callback
      sessionStorage.setItem('pendingRegistration', JSON.stringify({
        displayName,
        email,
        inviteCode,
      }));

      // Redirect to Auth0 signup with email pre-filled
      loginWithRedirect({
        authorizationParams: {
          screen_hint: 'signup',
          login_hint: email,
        },
      });
    } catch {
      setError('Something went wrong');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <p>Enter your details and invite code to register.</p>

      <div>
        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Invite Code"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleValidateInvite}>Continue</button>

      <p>
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
      <p>
        <Link to="/">Back</Link>
      </p>
    </div>
  );
}
