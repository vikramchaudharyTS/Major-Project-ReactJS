import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import SingleButton from '../components/comp/SingleButton';
import { IoPersonRemoveSharp, IoPersonAdd } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function SuggestedUsers() {
    const { suggestedUsers, friendStatus, fetchSuggestedUsers, toggleFollowStatus, isLoading } = useAuthStore();
    const navigate = useNavigate();

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

    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`);
    };

    return (
        <>
            <h1 className='w-full bg-zinc-800 text-center text-lg font-medium rounded-full py-2 hover:bg-zinc-700 cursor-pointer transition-all'>
                Add Friends
            </h1>
            {isLoading ? (
                <p className="text-center text-gray-400 mt-5">Loading...</p>
            ) : (
                <div className="w-full h-[43%] mt-5 flex flex-col gap-4 overflow-y-auto rounded-lg">
                    {suggestedUsers.map((user) => (
                        <div 
                            key={user._id} 
                            className="bg-zinc-800/40 hover:bg-zinc-800/80 px-4 py-2 flex items-center rounded-md w-full cursor-pointer transition-all"
                            onClick={() => handleUserClick(user._id)}
                        >
                            <div className='flex-shrink-0'>
                                <img 
                                    className='w-12 h-12 object-cover rounded-full border border-gray-700' 
                                    src={user.profileImg} 
                                />
                            </div>
                            <div className='flex flex-col gap-1 flex-grow ml-4'>
                                <h1 className='text-md font-semibold text-gray-100 truncate'>
                                    {user.name || "Unknown User"}
                                </h1>
                                <SingleButton 
                                    data={friendStatus[user._id] ? addedFriend : addFriends} 
                                    customClasses='w-28 h-8 text-xs font-medium rounded-md overflow-hidden' 
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        toggleFollowStatus(user._id);
                                    }}
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
