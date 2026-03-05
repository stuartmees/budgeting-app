import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallback() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !user) {
      navigate('/');
      return;
    }

    const completeAuth = async () => {
      try {
        // Check for pending registration
        const pendingReg = sessionStorage.getItem('pendingRegistration');

        if (pendingReg) {
          // New user registration flow
          const { displayName, email, inviteCode } = JSON.parse(pendingReg);

          const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              auth0Id: user.sub,
              email: email,
              displayName: displayName,
              inviteCode: inviteCode,
            }),
          });

          if (!response.ok) {
            const data = await response.json();
            setError(data.error || 'Registration failed');
            return;
          }

          // Clear pending registration
          sessionStorage.removeItem('pendingRegistration');
          navigate('/home');
        } else {
          // Existing user sign-in flow
          const response = await fetch('/api/auth/users/lookup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              auth0Id: user.sub,
              email: user.email,
            }),
          });

          if (!response.ok) {
            setError('User not found. Please register with an invite code.');
            return;
          }

          navigate('/home');
        }
      } catch {
        setError('Something went wrong');
      }
    };

    completeAuth();
  }, [isAuthenticated, isLoading, user, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p style={{ color: 'red' }}>{error}</p>
        <a href="/">Go back</a>
      </div>
    );
  }

  return <div>Completing authentication...</div>;
}
