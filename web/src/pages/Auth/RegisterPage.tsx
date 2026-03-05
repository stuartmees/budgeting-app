import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
      const response = await fetch('/api/auth/sign-up-invites/validation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: inviteCode }),
      });

      if (!response.ok) {
        setError("Sorry, doesn't look like you've been invited to Budgeteer yet!");
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
    <div className="min-h-screen flex flex-col">
      <div className="w-full bg-black py-4 px-8">
        <h1 className="text-2xl font-bold text-white text-center md:text-right">
          Budgeteer
        </h1>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">
      <h2 className="text-3xl font-bold mb-4">Register</h2>
      <p className="text-muted-foreground mb-8">
        Enter the email address and invite code you were invited with.
      </p>

      <div className="w-full max-w-sm space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Invite Code"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />

        <p className="text-sm text-muted-foreground">
          Give us a display name you'd like us to refer to you as.
        </p>
        <Input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button onClick={handleValidateInvite} className="w-full">
          Continue
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          <button
            onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: 'login' } })}
            className="text-primary underline"
          >
            Sign In
          </button>
        </p>
        <p className="text-sm text-center">
          <Link to="/" className="text-muted-foreground underline">
            Back
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
}
