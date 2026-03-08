import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';

const UserNotFoundPage = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignIn = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'login',
      },
    });
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4 tracking-wide" style={{ fontFamily: "'Libre Baskerville', serif" }}>Sorry, we can't find you in our system.</h1>
      <p className="text-gray-500 mb-8 whitespace-nowrap text-base md:text-lg">Check your sign in details and try again or register with us!</p>

      <div className="flex gap-4">
        <Link to="/register">
          <Button className="hover:bg-primary/80 text-sm md:text-base font-normal tracking-normal">Register</Button>
        </Link>
        <Button variant="outline" onClick={handleSignIn} className="text-primary border-primary/50 hover:bg-primary/15 hover:text-primary text-sm md:text-base font-normal tracking-normal">
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default UserNotFoundPage;
