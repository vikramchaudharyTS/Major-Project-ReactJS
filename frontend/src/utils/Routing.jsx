//@ts-nocheck
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Register from '../Pages/Register';
import LoginPage from '../Pages/Login';
import EmailVerificationPage from '../Pages/EmailVerificationPage';
import ForgotPasswordPage from '../Pages/ForgotPassworPage'; 
import ResetPasswordPage from '../Pages/ResetPasswordPage';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import LandingPage from '../Pages/LandingPage';
import Settings from '../Pages/Settings';
import Messages from '../Pages/Messages';
import Notification from '../Pages/Notification';
import ProfilePage from '../Pages/ProfilePage';
import Explorer from '../Pages/Explorer';
import Layout from '../layouts/Layout'; 

const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) return <Navigate to='/login' replace />;
    if (!user || !user.isVerified) return <Navigate to='/verify-email' replace />;

    return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated && user?.isVerified) {
      return <Navigate to='/dashboard' replace />;
    }

    return children;
};

function Routing() {
    const { isCheckingAuth, checkAuth } = useAuthStore();

    useEffect(() => {
      checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) return <LoadingSpinner />;

    return (
        <Routes>
          {/* Public routes */}

          <Route path='/signup' element={<Register/>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/verify-email' element={<EmailVerificationPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password/:token' element={<ResetPasswordPage />} />

          {/* Protected routes with Layout */}
          <Route element={<ProtectedRoutes><Layout /></ProtectedRoutes>}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/explorer' element={<Explorer />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/notifications' element={<Notification />} />
            <Route path='/settings' element={<Settings />} />
          </Route>

          {/* Default route */}
          <Route path='/' element={<ProtectedRoutes><Layout /><LandingPage /></ProtectedRoutes>} />
        </Routes>
    );
}

export default Routing;
