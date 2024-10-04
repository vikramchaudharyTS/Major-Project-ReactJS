import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import {Context} from '../contexts/Context'
import { LuArrowLeftFromLine } from "react-icons/lu";
import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import Notifications from '../components/Notifications';

function Dashboard() {
    const {isActive, setIsActive} = useContext(Context)
  return (
    <>
        <Navbar />
        <div className='flex items-center justify-between'>
           
            <div className='w-[13%] h-screen backdrop-blur-sm'>
                {isActive ? <Sidebar  /> : null}
                <LuArrowLeftFromLine onClick={()=>setIsActive(!isActive)} className='absolute left-[92%] bottom-[50%] rounded-full bg-zinc-700 p-2 w-8 h-8 cursor-pointer hover:bg-zinc-700/80' />
            </div>

            <div className='flex w-[87%]'>
                <div className='mx-10 w-[49%] h-screen flex flex-col items-center overflow-scroll'>
                    <Feed/>
                </div>
                <div className='w-[20%] bg-zinc-600 mr-10'>
                    <Notifications />
                </div>
                <div className='w-[23%] bg-zinc-700'>
                    dfsd
                </div>
            </div>
        </div>
        
        


    </>
    
  )
}

export default Dashboard