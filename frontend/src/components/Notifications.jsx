import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios.js";
import NotificationCall from "./comp/NotificationCall";

function Notifications() {
  const [notifications, setNotifications] = useState([]); // State to store notifications
  const [loading, setLoading] = useState(true); // State to handle loading
  const [isActiveNotification, setIsActiveNotification] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get("/users/notifications");
        setNotifications(response.data); // Set fetched notifications in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setLoading(false); // Set loading to false even on error
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div
      className={`mt-24 w-full flex flex-col px-4 flex-wrap items-center justify-start rounded-lg py-1 gap-2 ${
        isActiveNotification ? "h-[40%]" : null
      }`}
    >
      <h1
        onClick={() => setIsActiveNotification(!isActiveNotification)}
        className="w-full bg-zinc-800 text-center rounded-full py-2 hover:bg-zinc-700/80 cursor-pointer"
      >
        Notifications
      </h1>

      {loading ? (
        <p>Loading notifications...</p> // Display a loading message while fetching
      ) : isActiveNotification && notifications.length > 0 ? (
        <NotificationCall notificationCallData={notifications} />
      ) : isActiveNotification && notifications.length === 0 ? (
        <p>No notifications found.</p> // Display when there are no notifications
      ) : null}
    </div>
  );
}

export default Notifications;
