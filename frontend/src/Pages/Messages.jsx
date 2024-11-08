import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ExtremeRightBar from '../components/ExtremeRightBar'
import MessagesBox from '../components/MessagesBox'


function Messages() {
  return (
    <>
      <div className='flex items-center justify-between overflow-hidden w-full'>
           
           <div className='w-[13%] h-screen backdrop-blur-sm'>
               <Sidebar  />
           </div>

           <div className='flex flex-col w-[87%]'>
               <div className='absolute top-0'>
                   <Navbar />
               </div>

               <div className='w-full h-screen px-10 rounded-lg flex justify-between'>
                   <div className='w-[25%]'>
                      <ExtremeRightBar />
                   </div>
                   <div className='w-[68%] h-[88%] my-24 mr-10 overflow-hidden bg-zinc-700 rounded-lg'>
                    <MessagesBox />
                   </div>
               </div>
           </div>
           
       </div>
    </>
  )
}

export default Messages