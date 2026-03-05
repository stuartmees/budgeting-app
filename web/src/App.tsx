import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import PreAuthPage from './pages/Auth/PreAuthPage';
import RegisterPage from './pages/Auth/RegisterPage';
import SignInPage from './pages/Auth/SignInPage';
import AuthCallback from './pages/Auth/AuthCallback';
import HomePage from './pages/HomePage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
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
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><PreAuthPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/sign-in" element={<PublicRoute><SignInPage /></PublicRoute>} />
        <Route path="/callback" element={<AuthCallback />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
