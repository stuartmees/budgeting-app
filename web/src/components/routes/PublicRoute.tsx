import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingIndicator from '../ui/LoadingIndicator';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  // If authenticated, go through callback to set up session (if not already done)
  if (isAuthenticated) {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      // Session already set up, go to home
      return <Navigate to="/home" replace />;
    }
    // Need to go through callback to set up session
    return <Navigate to="/callback" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
