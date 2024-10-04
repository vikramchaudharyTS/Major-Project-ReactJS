import React from 'react'

function Notifications() {
  return (
    <>
      <div className='mt-24 w-full flex flex-col px-4 flex-wrap items-center justify-center gap-7'>
        <h1 className='w-full bg-zinc-800 text-center rounded-full py-2'>Notifications</h1>
        
        {/* notification data */}
        <div className='flex flex-col items-start w-full'>
            <img className='w-10 h-10 object-cover rounded-full' src="https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZXxlbnwwfHwwfHx8MA%3D%3D" alt="User avatar" />
            <h1 className='text-md font-semibold'>
              username 
              <span className='font-normal text-sm text-gray-400'> 
                &nbsp;Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
            </h1>
            
            {/* username and text in the same line */}
            
          </div>
      </div>
    </>
  )
}

export default Notifications
