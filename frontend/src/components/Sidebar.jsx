//@ts-nocheck
import React from 'react';
import ThreePartButtons from './comp/ThreePartButtons';
import { IoHomeOutline } from "react-icons/io5";
import { BiSolidBinoculars } from "react-icons/bi";
import { LuMessagesSquare } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { MdNotifications } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import LogoutButton from './comp/LogoutButton';
import SearchBar from './comp/SearchBar';
import { GrFingerPrint } from "react-icons/gr";

function Sidebar() {
    const options = [
        {
            icon: <IoHomeOutline />,
            optionName: "Dashboard",
            to: '/dashboard'
        },
        {
            icon: <BiSolidBinoculars />,
            optionName: "Explorer",
            to: '/explorer'
        },
        {
            icon: <LuMessagesSquare />,
            optionName: "Messages",
            to: '/messages'
        },
        {
            icon: <CgProfile />,
            optionName: "Profile",
            to: '/profile'
        },
        {
            icon: <MdNotifications />,
            optionName: "Notifications",
            to: '/notifications'
        },
        {
            icon: <CiSettings />,
            optionName: "Settings",
            to: '/settings'
        }
    ];

    return (
        <div className="h-[99%] py-4 px-3 bg-zinc-800/60 rounded-lg ml-2 flex flex-col justify-between overflow-hidden shadow-lg">
            <div>
                {/* Logo and site name */}
                <div className="flex items-center justify-between px-2 mb-6 cursor-pointer">
                    <div className="text-4xl text-green-500"><GrFingerPrint /></div>
                    <h1 className="font-semibold text-2xl text-white">Vault</h1>
                </div>
                <hr className="border-zinc-600 mb-6" />


                {/* Navigation options */}
                <ThreePartButtons options={options} />
            </div>

            {/* Logout button */}
            <LogoutButton />
        </div>
    );
}

export default Sidebar;
