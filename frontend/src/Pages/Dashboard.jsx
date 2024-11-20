// Dashboard.js
import React, { useEffect } from 'react';
import Feed from '../components/Feed';
import Notifications from '../components/Notifications';
import ExtremeRightBar from '../components/ExtremeRightBar';
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import SuggestedUsers from '../components/SuggestUsers';

function Dashboard() {
  const { isAuthenticated, isLoading, isCheckingAuth, user } = useAuthStore();
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (isCheckingAuth || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='flex w-full'>
      <div className='mx-10 w-[49%] h-screen flex flex-col items-center overflow-scroll'>
        <Feed />
      </div>
      <div className='w-[20%] h-screen mr-10'>
        <Notifications />
        <SuggestedUsers />
      </div>
      <div className='w-[23%] h-screen'>
        <ExtremeRightBar />
      </div>
    </div>
  );
}

export default Dashboard;
