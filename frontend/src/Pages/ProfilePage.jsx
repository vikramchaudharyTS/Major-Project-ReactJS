import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AccountPosts from '../components/AccountPosts'
import ProfileBlock from '../components/ProfileBlock'

function ProfilePage() {
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

               <div className='w-full h-screen px-10 flex justify-between'>
                  <div className='bg-zinc-800/20 w-full h-[88%] mt-24 flex-1 flex overflow-hidden rounded-lg'>
                      {/* profile block */}
                      <div className='w-[30%] h-full'>
                        <ProfileBlock />
                      </div>
                      {/* posts block */}
                      <div className='overflow-y-scroll w-[70%] flex flex-wrap gap-14 p-16 items-start justify-start'>                      
                        <AccountPosts />
                        <AccountPosts />
                        <AccountPosts />
                        <AccountPosts />
                        <AccountPosts />
                        <AccountPosts />
                        <AccountPosts />
                        <AccountPosts />
                        <AccountPosts />
                      </div>
                  </div>
               </div>
           </div>
           
       </div>
    </>
  )
}

export default ProfilePage