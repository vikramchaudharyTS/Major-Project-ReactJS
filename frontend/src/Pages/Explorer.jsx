import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Post from '../components/Post'

function Explorer() {
  return (
    <>
      <div className='flex items-center justify-between overflow-hidden'>
           
           <div className='w-[13%] h-screen backdrop-blur-sm'>
               <Sidebar  />
           </div>

           <div className='flex flex-col w-[87%]'>
               <div className='absolute top-0'>
                   <Navbar />
               </div>

               <div className='w-full h-screen px-10 rounded-lg'>
                   <div className='w-full h-[88%] my-24 overflow-scroll'>
                      <Post />
                   </div>
               </div>
           </div>

           
       </div>
    </>
  )
}

export default Explorer