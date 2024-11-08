//@ts-nocheck
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import LoadingSpinner from '../components/LoadingSpinner';
import Register from '../Pages/Register';
import LoginPage from '../Pages/Login';
import EmailVerificationPage from '../Pages/EmailVerificationPage';
import ForgotPasswordPage from '../Pages/ForgotPassworPage'; 
import ResetPasswordPage from '../Pages/ResetPasswordPage';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';
import LandingPage from '../Pages/LandingPage';
import Settings from '../Pages/Settings'
import Messages from '../Pages/Messages'
import Notification from '../Pages/Notification'
import PofilePage from '../Pages/ProfilePage'
import Explorer from '../Pages/Explorer'
import ProfilePage from '../Pages/ProfilePage';

const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) return <Navigate to='/login' replace />;
    if (!user || !user.isVerified) return <Navigate to='/verify-email' replace />;

    return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated && user?.isVerified) {
      return <Navigate to='/' replace />;
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
        <div className='absolute inset-0 flex items-center justify-center w-full'>
        <Routes>
          <Route path='/' element={<ProtectedRoutes><LandingPage /></ProtectedRoutes>} />
          <Route path='/signup' element={<Register/>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/verify-email' element={<EmailVerificationPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
          <Route path='/dashboard' element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>} />
          <Route path='/explorer' element={<ProtectedRoutes><Explorer/></ProtectedRoutes>} />
          <Route path='/messages' element={<ProtectedRoutes><Messages/></ProtectedRoutes>} />
          <Route path='/profile' element={<ProtectedRoutes><ProfilePage/></ProtectedRoutes>} />
          <Route path='/notifications' element={<ProtectedRoutes><Notification/></ProtectedRoutes>} />
          <Route path='/settings' element={<ProtectedRoutes><Settings/></ProtectedRoutes>} />
        </Routes>
      </div>
    );
}

export default Routing;
