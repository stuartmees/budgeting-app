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
      <div className="w-full bg-primary py-4 px-8">
        <h1 className="text-2xl font-bold text-white text-center md:text-right" style={{ fontFamily: "'Libre Baskerville', serif" }}>
          Budgeteer
        </h1>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">
      <h2 className="text-3xl font-bold mb-8">Register</h2>
      <p className="text-muted-foreground mb-6 text-center">
        Enter the email address and invite code you were invited with.
      </p>

      <div className="w-full max-w-sm space-y-4">
        <Input
          type="email"
          placeholder="Email . . ."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-center bg-white placeholder:text-gray-400 placeholder:font-extralight border-transparent focus-visible:ring-0 focus-visible:border-gray-400"
        />
        <Input
          type="text"
          placeholder="Invite Code . . ."
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          className="text-center bg-white placeholder:text-gray-400 placeholder:font-extralight border-transparent focus-visible:ring-0 focus-visible:border-gray-400"
        />

        <p className="text-muted-foreground text-center mt-6 whitespace-nowrap">
          Give us a display name you'd like us to refer to you as.
        </p>
        <Input
          type="text"
          placeholder="Display Name . . ."
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="text-center bg-white placeholder:text-gray-400 placeholder:font-extralight border-transparent focus-visible:ring-0 focus-visible:border-gray-400"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button onClick={handleValidateInvite} className="w-full hover:bg-primary/80 font-[425] tracking-wide mt-6">
          Continue
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          Already have an account?&nbsp;&nbsp;
          <button
            onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: 'login' } })}
            className="text-primary hover:text-primary/80 cursor-pointer"
          >
            Sign In
          </button>
        </p>
        <p className="text-sm text-center">
          <Link to="/" className="text-primary hover:text-primary/80 cursor-pointer">
            Back
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
}
