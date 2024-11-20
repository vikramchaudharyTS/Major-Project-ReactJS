import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import SingleButton from '../components/comp/SingleButton';
import { IoPersonRemoveSharp, IoPersonAdd } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function SuggestedUsers() {
    const { suggestedUsers, friendStatus, fetchSuggestedUsers, toggleFollowStatus, isLoading } = useAuthStore();
    const navigate = useNavigate(); // Initialize navigate for page redirection

    useEffect(() => {
        fetchSuggestedUsers();
    }, [fetchSuggestedUsers]);

    const addFriends = {
        color: 'bg-green-500',
        icon: <IoPersonAdd />,
        heading: "Add Friend",
    };
    const addedFriend = {
        color: 'bg-sky-500',
        icon: <IoPersonRemoveSharp />,
        heading: "Added",
    };

    // Handle the user click to navigate to their profile page
    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`); // Navigate to the profile page of the clicked user
    };

    return (
        <>
            <h1 className='w-full bg-zinc-800 text-center rounded-full py-2 hover:bg-zinc-700/80 cursor-pointer'>Add Friends</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="w-full h-[43%] mt-5 flex flex-wrap overflow-scroll items-start justify-center rounded-lg">
                    {suggestedUsers.map((user) => (
                        <div
                            key={user._id}
                            className="bg-zinc-800/40 hover:bg-zinc-800/80 px-4 py-2 gap-2 h-24 flex items-center rounded-md w-80 overflow-hidden"
                            onClick={() => handleUserClick(user._id)} // Add the onClick to navigate
                        >
                            <div className='w-[20%]'>
                                <img className='w-12 h-12 object-cover rounded-full object-center' src={user.avatarUrl} alt="User avatar" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h1 className='text-md overflow-hidden w-48 whitespace-nowrap text-ellipsis'>
                                    {user.name}
                                </h1>
                                <SingleButton
                                    data={friendStatus[user._id] ? addedFriend : addFriends}
                                    customClasses='w-36 h-7 overflow-hidden'
                                    onClick={() => toggleFollowStatus(user._id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default SuggestedUsers;
