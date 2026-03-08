import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/Button';
import { REGISTER } from '../constants/routes';  

interface GuestPanelProps {
  title: string;
  subtitle: string;
  description?: string
}

const GuestPanel = ({ description, subtitle, title }: GuestPanelProps) => {
  const { loginWithRedirect } = useAuth0();

  const handleSignIn = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'login',
      },
    });
  };

  return (
    <div className="min-h-screen flex-1 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4 tracking-wide" style={{ fontFamily: "'Libre Baskerville', serif" }}>{title}</h1>
      <p className={`text-gray-500 ${description ? 'mb-2' : 'mb-8'} whitespace-nowrap text-base md:text-lg`}>{subtitle}</p>
      {description && <p className="text-gray-500 font-light mb-8 whitespace-nowrap text-base md:text-lg">{description}</p>}

      <div className="flex gap-4">
        <Link to={REGISTER}>
          <Button className="hover:bg-primary/80 text-sm md:text-base font-normal tracking-normal">Register</Button>
        </Link>
        <Button variant="outline" onClick={handleSignIn} className="text-primary border-primary/50 hover:bg-primary/15 hover:text-primary text-sm md:text-base font-normal tracking-normal">
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default GuestPanel;
