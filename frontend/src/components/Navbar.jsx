//@ts-nocheck
import React, { useState } from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import CreatePost from './CreatePost';
import { useAuthStore } from "../store/authStore.js";

function Navbar() {
  const [isCreatePostActive, setIsCreatePostActive] = useState(false);
  const { user, isAuthenticated } = useAuthStore(); // Access user and isAuthenticated from Zustand store

  return (
    <>
      <nav className='fixed ml-8 mt-2 backdrop-blur-sm w-[85%] flex items-center justify-between bg-zinc-800/60 px-2 overflow-hidden py-2 rounded-full z-10'>
        <input
          type="text"
          placeholder='Search'
          className='w-[50%] rounded-full px-3 py-2 outline-none bg-zinc-500/20'
        />
        <div
          onClick={() => setIsCreatePostActive(!isCreatePostActive)}
          className='flex items-center gap-2 border-[1px] border-zinc-700 p-2 rounded-lg cursor-pointer'
        >
          Create post <IoCreateOutline className='text-xl' />
        </div>
        <div className='flex gap-5 items-center text-[18px] px-3 cursor-pointer'>
          {isAuthenticated && user ? (
            <>
              <img
                className='w-10 h-10 object-cover rounded-full'
                src={user.img || '/default-profile.png'} // Use a default profile image if `user.img` is undefined
                alt="profile img"
              />
              <h1>{user.username || "User"}</h1>
            </>
          ) : (
            <h1>Loading...</h1>
          )}
          <MdKeyboardArrowDown className='w-10 h-10 hover:bg-zinc-500/20 rounded-full text-sm p-3' />
        </div>
      </nav>
      {isCreatePostActive && <CreatePost isCreatePostActive={isCreatePostActive} setIsCreatePostActive={setIsCreatePostActive} />}
    </>
  );
}

export default Navbar;
