import { Link, useSearchParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';

export default function PreAuthPage() {
  const { loginWithRedirect } = useAuth0();
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  const handleSignIn = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'login',
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Libre Baskerville', serif" }}>Welcome to Budgeteer</h1>
      <p className="text-muted-foreground mb-8">Track your monthly budgets in real time.</p>

      {error === 'not-found' && (
        <p className="text-red-500 mb-4">
          Sorry, can't match those details to a Budgeteer account!
        </p>
      )}

      <div className="flex gap-4">
        <Link to="/register">
          <Button className="hover:bg-primary/80">Register</Button>
        </Link>
        <Button variant="outline" onClick={handleSignIn} className="text-primary border-primary/50 hover:bg-primary/15 hover:text-primary">
          Sign In
        </Button>
      </div>
    </div>
  );
}
