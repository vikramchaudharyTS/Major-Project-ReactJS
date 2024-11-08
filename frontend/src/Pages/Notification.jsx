import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

function Notification() {
  return (
    <>
    <div className='flex items-center justify-between w-full'>
           
           <div className='w-[13%] h-screen backdrop-blur-sm'>
               <Sidebar  />
           </div>

           <div className='flex flex-col w-[87%]'>
           <div className='absolute top-0'>
                   <Navbar />
               </div>

               <div className='w-full h-screen px-10 rounded-lg flex justify-between'>
                  <div className='w-[38%] h-[88%] my-24 mr-10 overflow-hidden bg-zinc-700 rounded-lg'>
                    
                  </div>
                  <div className='w-[25%]'>
                     
                  </div>
                   
               </div>
           </div>

           
       </div>
  </>
  )
}

export default Notification