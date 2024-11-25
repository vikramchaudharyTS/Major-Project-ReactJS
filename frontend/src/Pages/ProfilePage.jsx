import React, { useEffect } from 'react';
import AccountPosts from '../components/AccountPosts';
import ProfileBlock from '../components/ProfileBlock';
import { useAuthStore } from '../store/authStore';
import { useParams } from 'react-router-dom';

function ProfilePage() {
  const { user, anotherUser, fetchAnotherUserData, isLoading, error } = useAuthStore();
  const { userId } = useParams();

  // Fetch user data based on route
  useEffect(() => {
    if (userId) {
      fetchAnotherUserData(userId); // Fetch data for another user
    }
  }, [userId, fetchAnotherUserData]);

  // Determine which user data to display
  const displayedUser = userId ? anotherUser : user;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex items-center justify-between overflow-hidden">
      <div className="flex flex-col">
        <div className="w-full h-screen px-10 flex justify-between">
          <div className="bg-zinc-800/20 w-[83vw] h-[88%] mt-24 flex-1 flex overflow-hidden rounded-lg">
            {/* Profile block */}
            <div className="w-[30%] h-full">
              <ProfileBlock user={displayedUser} />
            </div>
            {/* Posts block */}
            <div className="overflow-y-scroll w-[70%] flex flex-wrap gap-14 p-16 items-start justify-start min-h-[calc(100vh-96px)]">
              <AccountPosts user={displayedUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;


