import React, { useContext, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import Notifications from '../components/Notifications';
import ExtremeRightBar from '../components/ExtremeRightBar';
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";


function Dashboard() {
    const { user, isAuthenticated, isLoading, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (isCheckingAuth || isLoading) {
    return <LoadingSpinner />;
  }

    return (
        <>
            <div className='flex items-center justify-between w-full'>
                <div className='w-[13%] h-screen backdrop-blur-sm'>
                    <Sidebar />
                </div>

                <div className='flex flex-col w-[87%]'>
                    <div>
                        <Navbar />
                    </div>

                    <div className='flex'>
                        <div className='mx-10 w-[49%] h-screen flex flex-col items-center overflow-scroll'>
                            <Feed />
                        </div>
                        <div className='w-[20%] mr-10'>
                            <Notifications />
                        </div>
                        <div className='w-[23%] h-screen'>
                            <ExtremeRightBar />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
