import React from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";

function Navbar() {
  return (
    <>
        <nav className='fixed ml-10 mt-2 backdrop-blur-sm w-[85%] flex items-center justify-between bg-zinc-800/60 px-2 overflow-hidden py-2 rounded-full z-10'>
            <input type="text" placeholder='Search' className='w-[50%] rounded-full px-3 py-2 outline-none bg-zinc-500/20' />
            <div className='flex gap-5 items-center text-[18px] px-3 cursor-pointer'>
                <img className='w-10 h-10 object-cover rounded-full' src="https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                <h1>username</h1>
                <MdKeyboardArrowDown className='w-10 h-10 hover:bg-zinc-500/20 rounded-full text-sm p-3' />
            </div>
        </nav>
    </>
  )
}

export default Navbar