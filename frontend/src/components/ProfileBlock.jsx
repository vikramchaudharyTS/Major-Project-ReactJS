import React from 'react'
import SingleButton from './comp/SingleButton';
import { IoPersonAdd } from "react-icons/io5";
import { TbMessage } from "react-icons/tb";

function ProfileBlock() {
  const text = "Lorem ipsum dolor sit amet, consectetur adipisicingmaxime, aperiam animi debitis tenetur doloribus. Facere commodi unde earum obcaecati eum nulla cumque, eius quo quasi? Soluta, aperiam perferendis. Beatae, ut? Distinctio, quae?";
  
  const maxChars = 200; // Limit to 200 characters
  const truncatedText = text.length > maxChars ? text.substring(0, maxChars) + "..." : text;

  const followButtonData = {
    color: 'bg-green-500',
    hoverColor: 'hover:bg-zinc-700/70',
    heading: 'Add friend',
    icon: <IoPersonAdd/>
  }
  const messageButtonData = {
    color: 'bg-zinc-700',
    hoverColor: 'hover:bg-sky-500/90',
    heading: 'Message',
    icon: <TbMessage/>
  }
  return (
    <>
      <div className='relative flex flex-col gap-4 mx-auto py-5 w-[90%]'>
      
        <div className=' w-full h-52 rounded-lg overflow-hidden'>
            <img className='w-full h-full object-cover object-center' src="https://plus.unsplash.com/premium_photo-1672791841826-1967b0ad200d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
      
        <div className='absolute left-36 top-40 border-4 w-32 h-32 rounded-full overflow-hidden shadow-lg'>
            <img className='w-full h-full object-cover object-center' src="https://plus.unsplash.com/premium_photo-1672791863886-b549df902b09?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  alt="" />
        </div>

        <div className='flex justify-between w-[80%] mx-auto py-1'>
          <div className='flex flex-col items-center'>
            <h1>32</h1>
            <h1 className='font-semibold'>Followers</h1>
          </div>
          <div className='flex flex-col items-center'>
            <h1>36</h1>
            <h1 className='font-semibold'>Followings</h1>
          </div>
        </div>

        <h1 className=' w-full text-center p-2 font-semibold text-xl'>Lebrob Junior James</h1>
        <h1 className=' w-full text-center -mt-5 mb-5 text-zinc-300'>@Lebrob</h1>

        <div className='flex justify-between mb-2'>
          <SingleButton data={followButtonData} />
          <SingleButton data={messageButtonData} />
        </div>

        <div className='max-h-36 h-fit overflow-hidden'>
          <p>{truncatedText}</p>
        </div>

        <div className='flex flex-col gap-3 mt-6'>
          <h1 className='font-semibold line-clamp-1 w-full'>Hobbies: </h1>
          <h1 className='font-semibold line-clamp-1'>interests: </h1>
          <h1 className='font-semibold line-clamp-1'>Goofy Moments: </h1>
          <h1 className='font-semibold line-clamp-1'>Story: </h1>
          <h1 className='font-semibold line-clamp-1'>Joke: </h1>
        </div>



      </div>
    </>
  )
}

export default ProfileBlock



