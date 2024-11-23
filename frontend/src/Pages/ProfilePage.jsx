import React from 'react';
import AccountPosts from '../components/AccountPosts';
import ProfileBlock from '../components/ProfileBlock';

function ProfilePage() {
  return (
    <>
      <div className='flex items-center justify-between overflow-hidden'>
        <div className='flex flex-col'>

          <div className='w-full h-screen px-10 flex justify-between'>
            <div className='bg-zinc-800/20 w-[83vw] h-[88%] mt-24 flex-1 flex overflow-hidden rounded-lg'>
              {/* profile block */}
              <div className='w-[30%] h-full'>
                <ProfileBlock />
              </div>
              {/* posts block */}
              <div className='overflow-y-scroll w-[70%] flex flex-wrap gap-14 p-16 items-start justify-start min-h-[calc(100vh-96px)]'>                       
                <AccountPosts />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default ProfilePage;
