import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AUTH_USER_INVITES_VALIDATION, USERS, AUTH_USERS_LOOKUP } from '../../constants/api'
import { LANDING } from '../../constants/routes'

const RegisterPage = () => {
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
      const response = await fetch(AUTH_USER_INVITES_VALIDATION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, inviteCode }),
      });

      if (!response.ok) {
        setError("Sorry, you can't register with that email and invite code. Try again!");
        return;
      }

      const data = await response.json();

      // Store registration data for after Auth0 callback
      sessionStorage.setItem('pendingRegistration', JSON.stringify({
        displayName,
        email,
        inviteCode,
        inviteId: data.id,
      }));

      // Redirect to Auth0 signup with email and invite ID
      loginWithRedirect({
        authorizationParams: {
          screen_hint: 'signup',
          login_hint: email,
          'xt-invite_id': data.id.toString(),
        },
      });
    } catch {
      setError('Something went wrong');
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <h2 className="text-4xl font-bold mb-6 tracking-wide" style={{ fontFamily: "'Libre Baskerville', serif" }}>Register</h2>
      <p className="text-gray-500 text-center mt-6 mb-4 whitespace-nowrap text-base md:text-lg">
        Enter the email address and invite code you were invited with.
      </p>

      <div className="w-full max-w-sm space-y-4">
        <Input
          type="email"
          placeholder="Email . . ."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-center bg-white placeholder:text-[#b5bbc3] placeholder:font-extralight border-transparent focus-visible:ring-0 focus-visible:border-gray-400 text-sm md:text-[0.925rem]"
        />
        <Input
          type="text"
          placeholder="Invite code . . ."
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          className="text-center bg-white placeholder:text-[#b5bbc3] placeholder:font-extralight border-transparent focus-visible:ring-0 focus-visible:border-gray-400 text-sm md:text-[0.925rem]"
        />

        <div className="flex justify-center w-full mt-6">
          <p className="text-gray-500 whitespace-nowrap text-base md:text-lg">
            Give us a display name you'd like us to refer to you as.
          </p>
        </div>
        <Input
          type="text"
          placeholder="Display name . . ."
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="text-center bg-white placeholder:text-[#b5bbc3] placeholder:font-extralight border-transparent focus-visible:ring-0 focus-visible:border-gray-400 text-sm md:text-[0.925rem]"
        />

        {error && (
          <div className="flex justify-center w-full">
            <p className="text-red-500 text-xs md:text-sm whitespace-nowrap">{error}</p>
          </div>
        )}

        <Button onClick={handleValidateInvite} className="w-full hover:bg-primary/80 mt-6 text-sm md:text-base font-normal tracking-normal">
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
          <Link to={LANDING} className="text-primary hover:text-primary/80 cursor-pointer">
            Back
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
