//@ts-nocheck
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from "react";
import { Context } from "../contexts/Context";
import Dashboard from "../Pages/Dashboard";
import Explorer from "../Pages/Explorer";
import LandingPage from "../Pages/LandingPage";
import Messages from "../Pages/Messages";
import ProfilePage from "../Pages/ProfilePage";
import Settings from "../Pages/Settings";
import Notification from "../Pages/Notification";
import Login from '../Pages/Login';
import Register from "../Pages/Register";
import EmailVerification from '../components/EmailVerification';

// Custom Private Route component for route protection
function PrivateRoute({ element }) {
    const { isAuth } = useContext(Context);
    return isAuth ? element : <Navigate to="/login" replace />;
}

function Routing() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/email-verification' element={<EmailVerification />} />


            {/* Protected routes */}
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/messages" element={<PrivateRoute element={<Messages />} />} />
            <Route path="/explorer" element={<PrivateRoute element={<Explorer />} />} />
            <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
            <Route path="/notifications" element={<PrivateRoute element={<Notification />} />} />
            <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
        </Routes>
    );
}

export default Routing;
