//@ts-nocheck
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'; // UseLocation to track current path
import Dashboard from '../Pages/Dashboard';
import Register from '../Pages/Register';
import LoginPage from '../Pages/Login';
import EmailVerificationPage from '../Pages/EmailVerificationPage';
import ForgotPasswordPage from '../Pages/ForgotPasswordPage'; 
import ResetPasswordPage from '../Pages/ResetPasswordPage';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';
import LandingPage from '../Pages/LandingPage';
import Settings from '../Pages/Settings';
import Messages from '../Pages/Messages';
import Notification from '../Pages/Notification';
import ProfilePage from '../Pages/ProfilePage';
import Explorer from '../Pages/Explorer';
import Layout from '../layouts/Layout'; 

const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();
    // Protect routes only for authenticated users
    if (!isAuthenticated) return <Navigate to='/login' replace />;
    if (!user || !user.isVerified) return <Navigate to='/verify-email' replace />;
    return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();
    const location = useLocation(); // Track current location

    // If user is authenticated and trying to access login or signup, redirect to dashboard
    if (isAuthenticated && user?.isVerified && (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/')) {
        return <Navigate to='/dashboard' replace />;
    }

    return children;
};

function Routing() {
    const { isCheckingAuth, checkAuth } = useAuthStore();
    const location = useLocation(); // Get current page

    useEffect(() => {
        // Only check auth when not on the login/signup pages
        if (location.pathname !== '/login' && location.pathname !== '/signup') {
            checkAuth(); // Check if the user is authenticated
        }
    }, [checkAuth, location.pathname]);

    // if (isCheckingAuth) return <LoadingSpinner />; // Wait until authentication check is complete

    return (
        <Routes>
          {/* Public routes */}
          <Route path='/' element={<RedirectAuthenticatedUser><LandingPage /></RedirectAuthenticatedUser>} />
          <Route path='/signup' element={<RedirectAuthenticatedUser><Register /></RedirectAuthenticatedUser>} />
          <Route path='/login' element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />
          <Route path='/verify-email' element={<EmailVerificationPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password/:token' element={<ResetPasswordPage />} />

          {/* Protected routes with Layout */}
          <Route element={<ProtectedRoutes><Layout /></ProtectedRoutes>}>
            <Route path='/profile/:userId' element={<ProfilePage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/explorer' element={<Explorer />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/notifications' element={<Notification />} />
            <Route path='/settings' element={<Settings />} />
          </Route>
        </Routes>
    );
}

export default Routing;
