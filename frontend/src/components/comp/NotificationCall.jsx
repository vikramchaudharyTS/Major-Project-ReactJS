import React from "react";

function NotificationCall({ notificationCallData }) {
  return (
    <>
      {notificationCallData.map((notification) => (
        <div
          key={notification.id} // Use 'id' from backend response for unique keys
          className="flex w-full items-center flex-nowrap p-2 hover:bg-zinc-800/80 hover:rounded-lg cursor-pointer"
        >
          {/* Profile image */}
          <div className="w-[20%]">
            <img
              className="w-10 h-10 object-cover rounded-full object-top"
              src={notification.from.profileImg || "/default-avatar.png"} // Fallback to default avatar
              alt={`${notification.from.username}'s avatar`}
            />
          </div>
          {/* Notification message */}
          <div className="w-[80%]">
            <h1 className="text-sm">
              {notification.message} {/* Render formatted message from backend */}
            </h1>
            
          </div>
        </div>
      ))}
    </>
  );
}

export default NotificationCall;
