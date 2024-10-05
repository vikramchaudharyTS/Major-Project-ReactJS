import React, { useContext } from 'react'
import ThreePartButtons from './comp/ThreePartButtons'
import { IoHomeOutline } from "react-icons/io5";
import { BiSolidBinoculars } from "react-icons/bi";
import { LuMessagesSquare } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { MdNotifications } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import SingleButton from './comp/SingleButton';
import { RiLogoutCircleLine } from "react-icons/ri";
import SearchBar from './comp/SearchBar';
import { GrFingerPrint } from "react-icons/gr";

function Sidebar() {
    const options = [
        {
            icon: <IoHomeOutline />,
            optionName: "Dashboard",
            to:'/dashboard'
        },
        {
            icon: <BiSolidBinoculars />,
            optionName: "Explorer",
            to:'/explorer'
        },
        {
            icon: <LuMessagesSquare />,
            optionName: "Messages",
            to:'/messages'
        },
        {
            icon: <CgProfile />,
            optionName: "Profile",
            to: '/profile'
        },
        {
            icon: <MdNotifications />,
            optionName: "Notifications",
            to:'/notifications'
        },
        {
            icon: <CiSettings />,
            optionName: "Settings",
            to:'/settings'
        }
    ]

    const logout = {
        icon: <RiLogoutCircleLine />,
        optionName: "Logout",
        to:'/logout'
    }


  return (
    <>
        <div className='bg-zinc-800/60 h-[98%] py-5 px-3 mt-2 ml-2 rounded-lg flex flex-col justify-between'>
            <div>
                {/* logo and site name */}
                <div className='flex justify-between px-2 items-center mb-8'>
                    <div className='text-4xl cursor-pointer'><GrFingerPrint /></div>
                    <h1 className='font-semibold text-xl cursor-pointer'>Vault</h1>
                </div>
                <hr className="border-zinc-600 mb-7" />

                {/* search */}
                <div className='mb-7'><SearchBar /></div>
                {/* options */}
                <ThreePartButtons options={options} />
            </div>


            <SingleButton data={logout} />
            
        </div>
    </>
  )
}

export default Sidebar