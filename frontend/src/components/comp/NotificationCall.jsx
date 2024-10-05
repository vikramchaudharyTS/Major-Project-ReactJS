import React from 'react'

function NotificationCall({notificationCallData}) {
  return (
        <>
            {notificationCallData.map((data, index)=>(
                <div key={index} className='flex w-full items-center flex-nowrap p-2 hover:bg-zinc-800/80 hover:rounded-lg cursor-pointer'>
                    <div className='w-[20%]'>
                        <img className='w-10 h-10 object-cover rounded-full object-top' src={`${data.image}`} alt="User avatar" />
                    </div>
                    <h1 className='text-md font-semibold'>
                        {data.username} 
                        <span className='font-normal text-sm text-gray-300'> 
                            &nbsp;{data.notificationAbout}
                        </span>
                    </h1>
             </div>
            ))}
        </>
  )
}

export default NotificationCall