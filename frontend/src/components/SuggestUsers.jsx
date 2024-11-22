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
            <h1 className='w-full bg-zinc-800 text-center rounded-full py-2 hover:bg-zinc-700/80 cursor-pointer'>Add Friends</h1>
            {isLoading ? (<p>Loading...</p>) : (
                <div className="w-full h-[43%] mt-5 flex flex-col gap-2 overflow-y-scroll items-start justify-start rounded-lg">
                    {suggestedUsers.map((user) => (
                        <div 
                            key={user._id} 
                            className="bg-zinc-800/40 hover:bg-zinc-800/80 px-4 py-2 h-20 flex items-center rounded-md w-full cursor-pointer" 
                            onClick={() => handleUserClick(user._id)}
                        >
                            <div className='w-[15%]'>
                                <img className='w-12 h-12 object-cover rounded-full' src={user.avatarUrl} alt="User avatar" />
                            </div>
                            <div className='flex flex-col gap-1 w-[85%]'>
                                <h1 className='text-md overflow-hidden whitespace-nowrap text-ellipsis'>
                                    {user.name}
                                </h1>
                                <SingleButton 
                                    data={friendStatus[user._id] ? addedFriend : addFriends} 
                                    customClasses='w-full h-7 overflow-hidden' 
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent navigation when clicking the button
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
