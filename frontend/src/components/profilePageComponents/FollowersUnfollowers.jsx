import React, { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { useParams } from "react-router-dom";

const FollowersUnfollowers = () => {
  const { user, anotherUser, fetchAnotherUserData, error } = useAuthStore();
  const { userId } = useParams();

  // Fetch user data based on route
  useEffect(() => {
    if (userId) {
      fetchAnotherUserData(userId); // Fetch data for another user
    }
  }, [userId, fetchAnotherUserData]);

  // Determine which user data to display
  const displayedUser = userId ? anotherUser : user;

  if (error) return <div>Error: {error}</div>;
  if (!displayedUser) return <div>Loading...</div>;

  return (
    <div className="bg-zinc-800 rounded-md text-white w-full">
      <div className="mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Followers Section */}
          <div className="flex-1 bg-zinc-900/20 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Followers</h2>
            <div className="space-y-6">
              {displayedUser.followers?.map((follower, index) => (
                <div key={index} className="flex items-center">
                  <img
                    alt={`${follower.name}'s profile`}
                    className="w-10 h-10 rounded-full"
                    src={follower.profileImg || "default-avatar-url"}
                  />
                  <div className="ml-3">
                    <p className="font-semibold">{follower.name}</p>
                  </div>
                  <button className="ml-auto bg-red-500 text-white px-3 py-1 rounded">
                    Unfollow
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Following Section */}
          <div className="flex-1 bg-zinc-900/20 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Following</h2>
            <div className="space-y-6">
              {displayedUser.following?.map((following, index) => (
                <div key={index} className="flex items-center">
                  <img
                    alt={`${following.name}'s profile`}
                    className="w-10 h-10 rounded-full"
                    src={following.profileImg || "default-avatar-url"}
                  />
                  <div className="ml-3">
                    <p className="font-semibold">{following.name}</p>
                  </div>
                  <button className="ml-auto bg-red-500 text-white px-3 py-1 rounded">
                    Unfollow
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Friends Section */}
          <div className="flex-1 bg-zinc-900/20 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Friends</h2>
            <div className="space-y-6">
              {displayedUser.friends?.map((friend, index) => (
                <div key={index} className="flex items-center">
                  <img
                    alt={`${friend.name}'s profile`}
                    className="w-10 h-10 rounded-full"
                    src={friend.profileImg || "default-avatar-url"}
                  />
                  <div className="ml-3">
                    <p className="font-semibold">{friend.name}</p>
                  </div>
                  <button className="ml-auto bg-red-500 text-white px-3 py-1 rounded">
                    Unfollow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowersUnfollowers;
