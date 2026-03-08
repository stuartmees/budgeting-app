import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Public/LandingPage';
import RegisterPage from './pages/Auth/RegisterPage';
import AuthCallback from './pages/Auth/AuthCallback';
import HomePage from './pages/HomePage';
import UserNotFoundPage from './pages/Public/UserNotFoundPage';
import Layout from './components/Layout';
import ProtectedRoute from './components/routes/ProtectedRoute';
import PublicRoute from './components/routes/PublicRoute';
import { LANDING, HOME, REGISTER, CALLBACK, USER_NOT_FOUND } from './constants/routes';  

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LANDING} element={<PublicRoute><LandingPage /></PublicRoute>} />
        <Route path={USER_NOT_FOUND} element={<PublicRoute><UserNotFoundPage /></PublicRoute>} />
        <Route element={<Layout />}>
          <Route path={REGISTER}element={<PublicRoute><RegisterPage /></PublicRoute>} />
          <Route path={CALLBACK} element={<AuthCallback />} />
          <Route path={HOME} element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
