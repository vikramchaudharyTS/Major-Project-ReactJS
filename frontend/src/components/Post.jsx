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
      <div className='w-[550px] h-fit bg-zinc-800 p-1 rounded-md'>

        <nav className='flex justify-between items-center mt-1 px-3'>
          <div className='flex gap-5 items-start'>
            <div className="w-16 h-16 overflow-hidden relative">
              <img className="object-cover w-full h-full rounded-full " src="https://images.unsplash.com/photo-1728042743598-576c873da085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8" alt="Your post" />
            </div>
            <div>
              <h1>username</h1>
              <h2>userEmail</h2>
            </div>
          </div>
          <div>
          <RiMenu3Fill className='text-lg' />
          </div>
        </nav>


        <div className="h-96 w-full overflow-hidden relative p-5 ">
          <img className="object-cover w-full h-full rounded-lg " src="https://images.unsplash.com/photo-1728042743598-576c873da085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8" alt="Your post" />
        </div>


        <div className='flex gap-6 items-center px-5 mb-4'>
          <FcLike className='text-xl' />
          <TfiCommentAlt className='text-xl' onClick={()=>setIsCommentActive(!isCommentActive)} />
          <RiShareForwardFill className='text-xl' />
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