import React, { useContext } from 'react'
import ThreePartButtons from './comp/ThreePartButtons'
import { IoHomeOutline } from "react-icons/io5";
import { BiSolidBinoculars } from "react-icons/bi";
import { LuMessagesSquare } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { MdNotifications } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { LuArrowLeftFromLine } from "react-icons/lu";
import { Context } from '../contexts/Context';

function Sidebar() {
    const options = [
        {
            icon: <IoHomeOutline />,
            optionName: "Dashboard"
        },
        {
            icon: <BiSolidBinoculars />,
            optionName: "Explorer"
        },
        {
            icon: <LuMessagesSquare />,
            optionName: "Messages"
        },
        {
            icon: <CgProfile />,
            optionName: "Profile"
        },
        {
            icon: <MdNotifications />,
            optionName: "Notifications"
        },
        {
            icon: <CiSettings />,
            optionName: "Settings"
        }
    ]


  return (
    <>
        <div className='fixed bg-zinc-800/60 h-[98%] py-5 px-3 mt-2 ml-2 rounded-lg'>
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