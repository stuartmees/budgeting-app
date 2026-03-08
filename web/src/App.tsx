import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Public/LandingPage';
import RegisterPage from './pages/Auth/RegisterPage';
import AuthCallback from './pages/Auth/AuthCallback';
import HomePage from './pages/HomePage';
import UserNotFoundPage from './pages/Public/UserNotFoundPage';
import Layout from './components/Layout';
import ProtectedRoute from './components/routes/ProtectedRoute';
import PublicRoute from './components/routes/PublicRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
        <Route element={<Layout />}>
          <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
          <Route path="/callback" element={<AuthCallback />} />
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/not-found" element={<PublicRoute><UserNotFoundPage /></PublicRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
