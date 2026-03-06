import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import Banner from '@/components/Banner';
import LoadingPage from '@/pages/common/LoadingPage';

interface User {
  id: number;
  oktaId: string;
  email: string;
  displayName: string | null;
  createdAt: string;
}

const HomePage = () => {
  const { logout } = useAuth0();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const storedUser = sessionStorage.getItem('currentUser');
        if (!storedUser) {
          setError('No user session found');
          setLoading(false);
          return;
        }

        const currentUser = JSON.parse(storedUser);
        const response = await fetch(`/api/views/homepage/${currentUser.id}`);

        if (!response.ok) {
          setError('Failed to load homepage');
          setLoading(false);
          return;
        }

        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch {
        setError('Something went wrong');
        setLoading(false);
      }
    };

    fetchHomepage();
  }, []);

  const handleSetupBudget = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Banner showLogout={!!user} onLogout={handleLogout} />
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-red-500 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Banner showLogout onLogout={handleLogout} />
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Libre Baskerville', serif" }}>
          Hi, {user?.displayName || 'User'}!
        </h2>

        <Button onClick={handleSetupBudget} className="hover:bg-primary/80 text-sm md:text-base font-normal tracking-normal">
          Set up your first monthly budget...
        </Button>

      </div>

      {showMessage && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 px-6 py-4 bg-primary/15 rounded-md">
          <p className="text-primary text-center">Hang on, mate. We've not got that far yet!</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
