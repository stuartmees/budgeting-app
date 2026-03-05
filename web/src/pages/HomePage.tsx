import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';

interface User {
  id: number;
  oktaId: string;
  email: string;
  displayName: string | null;
  createdAt: string;
}

export default function HomePage() {
  const { logout } = useAuth0();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    alert("Hang on, mate. We've not got that far yet!");
  };

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const Banner = ({ showLogout = false }: { showLogout?: boolean }) => (
    <div className="w-full bg-primary py-4 px-8 flex items-center relative">
      {showLogout && (
        <button onClick={handleLogout} className="text-white text-sm absolute left-8 hover:text-white/80">
          Log out
        </button>
      )}
      <h1 className="text-2xl font-bold text-white text-center md:text-right w-full" style={{ fontFamily: "'Libre Baskerville', serif" }}>
        Budgeteer
      </h1>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Banner />
        <div className="flex-1 flex items-center justify-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Banner showLogout />
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-red-500 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Banner showLogout />
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Libre Baskerville', serif" }}>
          Hi, {user?.displayName || 'User'}!
        </h2>

        <Button onClick={handleSetupBudget} className="hover:bg-primary/80">
          Set up your first monthly budget...
        </Button>
      </div>
    </div>
  );
}
