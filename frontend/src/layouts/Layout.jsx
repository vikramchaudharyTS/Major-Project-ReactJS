import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Layout = () => {
    return (
        <div className='flex h-full overflow-hidden selection:bg-blue-600 selection:text-white'>
            {/* Sidebar */}
            <div className='w-[13%] py-2 h-screen'>
                <Sidebar />
            </div>

            {/* Main content */}
            <div className='w-[87vw] flex flex-col'>
                {/* Navbar fixed to the top */}
                <div className='fixed w-full z-10'>
                    <Navbar />
                </div>

                {/* Content */}
                <div className='w-full flex-1 overflow-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
