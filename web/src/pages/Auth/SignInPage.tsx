import { useAuth0 } from '@auth0/auth0-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
    <div className="min-h-screen flex flex-col">
      <div className="w-full bg-black py-4 px-8">
        <h1 className="text-2xl font-bold text-white text-center md:text-right">
          Budgeteer
        </h1>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8">
      <p className="text-muted-foreground mb-8">Track your monthly spending in real time.</p>

      {error === 'not-found' && (
        <p className="text-red-500 mb-4">
          Sorry, can't match those details to a Budgeteer account!
        </p>
      )}

      <div className="w-full max-w-sm space-y-4">
        <Button onClick={handleSignIn} className="w-full">
          Sign In
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary underline">
            Register
          </Link>
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
