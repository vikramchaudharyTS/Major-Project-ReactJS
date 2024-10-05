import React, { useContext } from 'react'
import ThreePartButtons from './comp/ThreePartButtons'
import { IoHomeOutline } from "react-icons/io5";
import { BiSolidBinoculars } from "react-icons/bi";
import { LuMessagesSquare } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { MdNotifications } from "react-icons/md";
import { CiSettings } from "react-icons/ci";


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


  return (
    <>
        <div className='bg-zinc-800/60 h-[98%] py-5 px-3 mt-2 ml-2 rounded-lg'>
            {/* logo and site name */}
            <div>
                <div>Logo</div>
                <h1>Vault</h1>
            </div>
            {/* search */}
            <div></div>
            {/* options */}
            <ThreePartButtons options={options} />
        </div>
    </>
  )
}

export default Sidebar