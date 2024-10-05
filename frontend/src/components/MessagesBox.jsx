import React from 'react'
import { MdCall } from "react-icons/md";
import { BsCameraVideo } from "react-icons/bs";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { VscSend } from "react-icons/vsc";
import { MdKeyboardVoice } from "react-icons/md";
import { RiAttachment2 } from "react-icons/ri";
import { BsEmojiLaughing } from "react-icons/bs";

function MessagesBox() {
  return (
    <>

            <div className='flex flex-col justify-between h-[100%] w-full'>


                <nav className='flex items-center px-5 py-10 justify-between h-16 w-full bg-zinc-800'>
                    <div className='flex gap-5'>
                        <div><img className='w-14 h-14 object-cover rounded-full' src="https://images.unsplash.com/photo-1727731160236-046137e01855?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D" alt="Img" /></div>
                        <div>
                            <h1>username</h1>
                            <h1>online</h1>
                        </div>
                    </div>
                    <div className='flex gap-5 text-xl'>
                        <MdCall className='cursor-pointer' />
                        <BsCameraVideo className='cursor-pointer' />
                        <IoMdInformationCircleOutline className='cursor-pointer' />
                        <CiMenuKebab className='cursor-pointer' />
                    </div>
                </nav>

                <div className='flex-1 bg-black/70 p-4 overflow-y-auto'>
                    <div className='text-white'>space</div>
                </div>

                <div className='flex items-center px-4 h-16 bg-zinc-800'>
                    <BsEmojiLaughing className='text-xl z-100' />
                    <input type='text' className='w-[98%] h-10 px-4 rounded-md bg-transparent text-white outline-none' placeholder='Type a message...' />
                    <div className='flex gap-5 text-xl'>
                        <RiAttachment2 />
                        <MdKeyboardVoice />
                        <VscSend />
                    </div>
                </div>

            </div>
    </>
  )
}

export default MessagesBox