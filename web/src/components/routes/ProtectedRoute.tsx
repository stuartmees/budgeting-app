import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingIndicator from '../ui/LoadingIndicator';
import { LANDING } from '../../constants/routes'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!isAuthenticated) {
    return <Navigate to={LANDING} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
