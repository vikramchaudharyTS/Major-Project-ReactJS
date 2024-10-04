import React, { useState } from 'react'
import { RiMenu3Fill } from "react-icons/ri";
import { FcLike } from "react-icons/fc";
import { RiShareForwardFill } from "react-icons/ri";
import { TfiCommentAlt } from "react-icons/tfi";
import { BsFillSendFill } from "react-icons/bs";

function Post() {
  const [isCommentActive, setIsCommentActive] = useState(false)
  return (
    <>
      <div className='w-[90%] h-fit bg-zinc-800 p-1 rounded-md hover:scale-[100.5%]'>

        <nav className='flex justify-between items-center px-3 mt-3'>
          <div className='flex gap-5 items-center'>
            <div className="w-16 h-16 overflow-hidden relative">
              <img className="object-cover w-full h-full rounded-full " src="https://images.unsplash.com/photo-1728042743598-576c873da085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8" alt="Your post" />
            </div>
            <div>
              <h1 className='font-semibold'>username</h1>
              <h2 className='text-sm'>userEmail</h2>
            </div>
          </div>
          <div>
          <RiMenu3Fill className='w-10 h-10 hover:bg-zinc-500/20 rounded-full text-sm p-3' />
          </div>
        </nav>


        <div className="h-[600px] w-full overflow-hidden relative p-5 ">
          <img className="object-cover object-center w-full h-full rounded-lg " src="https://images.unsplash.com/photo-1728042743598-576c873da085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8" alt="Your post" />
        </div>


        <div className='flex gap-6 items-center px-5 mb-4'>
          <FcLike className='text-2xl' />
          <TfiCommentAlt className='text-2xl' onClick={()=>setIsCommentActive(!isCommentActive)} />
          <RiShareForwardFill className='text-2xl' />
        </div>

        {isCommentActive ? <div className='flex gap-4 items-center px-2 mb-4'>
          <input type="text" placeholder='comment...' className='w-full px-2 py-1 rounded-md outline-none text-black' />
          <BsFillSendFill className='text-lg' />
        </div> : null}
      </div>
    </>
  )
}

export default Post