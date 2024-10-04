import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import {Context} from '../contexts/Context'
import { LuArrowLeftFromLine } from "react-icons/lu";
import Post from '../components/Post';
import Navbar from '../components/Navbar';


function Dashboard() {
    const {isActive, setIsActive} = useContext(Context)
  return (
    <>
        <Navbar />
        <div className='flex items-center justify-between'>
           
            <div className='w-[13%] h-screen'>
                {isActive ? <Sidebar  /> : null}
                <LuArrowLeftFromLine onClick={()=>setIsActive(!isActive)} className='absolute left-[92%] bottom-[50%] rounded-full bg-zinc-700 p-2 w-8 h-8 cursor-pointer hover:bg-zinc-700/80' />
            </div>

            <div className='w-[55%] bg-zinc-700 flex flex-col items-center'>
                <Post/>
            </div>
        
            <div className='w-[22%] bg-zinc-700'>
dfsd
            </div>
        </div>
        
        


    </>
    
  )
}

export default Dashboard