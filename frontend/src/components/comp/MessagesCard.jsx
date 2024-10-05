import React, { useContext } from 'react'
import { Context } from '../../contexts/Context'

function MessagesCard() {

    const {users} = useContext(Context)
    
  return (
        <>
            {users.map((data, index)=>(
                <div key={index} className='flex w-full items-center flex-nowrap p-2 hover:bg-zinc-800/80 hover:rounded-lg cursor-pointer'>
                    <div className='w-[15%]'>
                        <img className='w-10 h-10 object-cover rounded-full object-top' src={`${data.img}`} alt="User avatar" />
                    </div>
                    <h1 className='text-md font-semibold'>
                        {data.name} 
                        <div className='font-normal text-sm text-gray-300'> 
                            {data.message}
                        </div>
                    </h1>
             </div>
            ))}
        </>
  )
}

export default MessagesCard