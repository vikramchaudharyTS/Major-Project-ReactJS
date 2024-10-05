import React, { useState } from 'react'
import NotificationCall from './comp/NotificationCall'


function Notifications() {
  const notificationCallData = [
    {
      username: "Vikram",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbGV8ZW58MHx8MHx8fDA%3D",
      notificationAbout: "Liked your post"
    },
    {
      username: "Falcon",
      image: "https://images.unsplash.com/photo-1440133197387-5a6020d5ace2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hbGV8ZW58MHx8MHx8fDA%3D",
      notificationAbout: "Replyed to your comment..."
    },
    {
      username: "Rajveer",
      image: "https://images.unsplash.com/photo-1492288991661-058aa541ff43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbGV8ZW58MHx8MHx8fDA%3D",
      notificationAbout: "Send you a friend request"
    },
    {
      username: "Nitin",
      image: "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFsZXxlbnwwfHwwfHx8MA%3D%3D",
      notificationAbout: "Liked your story"
    },
    {
      username: "Falcon",
      image: "https://images.unsplash.com/photo-1440133197387-5a6020d5ace2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hbGV8ZW58MHx8MHx8fDA%3D",
      notificationAbout: "Replyed to your comment..."
    }
  ]

  const [isActiveNotification, setIsActiveNotification] = useState(false)

  return (
    <>
      <div className={`mt-24 w-full flex flex-col px-4 flex-wrap items-center justify-start rounded-lg py-1 gap-2 ${isActiveNotification ? 'h-[40%]' : null }`}>

        <h1 onClick={()=>setIsActiveNotification(!isActiveNotification)} className='w-full bg-zinc-800 text-center rounded-full py-2 hover:bg-zinc-700/80 cursor-pointer'>Notifications</h1>
        
        {isActiveNotification ? <NotificationCall notificationCallData={notificationCallData} /> : null}

      </div>
    </>
  )
}

export default Notifications
