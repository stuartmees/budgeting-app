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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button variant="outline" onClick={handleLogout}>Log Out</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8">
        Hi, {user?.displayName || 'User'}!
      </h1>

      <Button onClick={handleSetupBudget} className="mb-4">
        Set up your first monthly budget...
      </Button>

      <Button variant="outline" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
}
