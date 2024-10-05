import React from 'react'
import { SlNote } from "react-icons/sl";
import SearchBar from './comp/SearchBar';
import MessagesCard from './comp/MessagesCard';



function ExtremeRightBar() {

    

      
  return (
    <>
        <div className='relative mt-24 w-full flex flex-col items-center gap-3 h-[88%] rounded-lg overflow-hidden bg-zinc-800/60'>

            <div className='w-full flex flex-col items-center gap-3 sticky top-0 backdrop-blur-lg z-11'>
                <div className='w-[95%] text-lg flex items-center justify-between p-3'>
                    <h1>Messages</h1>
                    <div className='p-2 hover:bg-zinc-500/20 rounded-full'><SlNote /></div>
                </div>
                <div className=' w-[80%]'><SearchBar /></div>
                <div className='w-[90%] flex items-center justify-between bold font-semibold mt-2'>
                    <div className='flex gap-5 cursor-pointer'>
                        <h1 className='relative'>Primary <span className='w-full bg-zinc-200 h-px p-px absolute -bottom-[7px] left-0'></span></h1>
                        <h1 className='text-zinc-500'>General</h1>
                    </div>
                    <h1 className='text-blue-600 cursor-pointer'>Requests (8)</h1>
                </div>
            </div>

            <div className='overflow-y-scroll'>
                <div className='w-full flex flex-col flex-wrap gap-1 mt-4 mb-2'><MessagesCard /></div>
            </div>
            


        </div>
    </>
  )
}

export default ExtremeRightBar