import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios.js';
import { useAuthStore } from '../store/authStore.js';

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {user} = useAuthStore()

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('/users/notifications');
        setNotifications(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading notifications...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="w-[86vw] h-screen px-10 rounded-lg flex justify-between">
      <div className="w-[38%] h-[88%] my-24 mr-10 overflow-y-auto bg-zinc-800/60 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-white mb-4">Notifications</h2>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center justify-between bg-zinc-800 p-4 rounded-lg mb-4 hover:bg-zinc-600 transition"
          >
            <div className="flex items-center">
              <img
                src={user?.profileImg}
                alt={user?.username || 'User'}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                {/* <h3 className="text-white font-semibold">{notification?.user?.username || 'Unknown User'}</h3> */}
                <p className="text-gray-200 text-md">{notification?.message || 'No message available'}</p>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              {new Date(notification?.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div className="w-[25%]">
        {/* Additional content can go here */}
      </div>
    </div>
  );
}
export default Notification;