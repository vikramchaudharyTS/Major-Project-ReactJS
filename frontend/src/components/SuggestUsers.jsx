import React, { useState } from 'react';
import SingleButton from '../components/comp/SingleButton';
import { IoPersonRemoveSharp } from "react-icons/io5";
import { IoPersonAdd } from "react-icons/io5";

function SuggestedUsers() {
    // Sample data for suggested users
    const suggestedUsers = [
        { id: 1, name: 'Vikram Chaudhary', avatarUrl: 'https://images.unsplash.com/photo-1648740366598-7fb7c5e73fa5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8' },
        { id: 2, name: 'John Doe', avatarUrl: 'https://images.unsplash.com/photo-1648740366598-7fb7c5e73fa5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8' },
        { id: 3, name: 'John Doe', avatarUrl: 'https://images.unsplash.com/photo-1648740366598-7fb7c5e73fa5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8' },
        { id: 4, name: 'John Doe', avatarUrl: 'https://images.unsplash.com/photo-1648740366598-7fb7c5e73fa5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8' },
        { id: 5, name: 'John Doe', avatarUrl: 'https://images.unsplash.com/photo-1648740366598-7fb7c5e73fa5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8' },
        { id: 6, name: 'John Doe', avatarUrl: 'https://images.unsplash.com/photo-1648740366598-7fb7c5e73fa5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8' },
    ];

    // Function to toggle friend status for a user
    const [friendStatus, setFriendStatus] = useState(
        suggestedUsers.reduce((acc, user) => {
            acc[user.id] = true; // Initially set all users to 'add friend'
            return acc;
        }, {})
    );

    const handleFriendFunction = (userId) => {
        setFriendStatus(prev => ({ ...prev, [userId]: !prev[userId] }));
    };

    const addFriends = {
        color: 'bg-green-500',
        icon: <IoPersonAdd />,
        heading: "Add friend",
    };
    const addedFriend = {
        color: 'bg-sky-500',
        icon: <IoPersonRemoveSharp />,
        heading: "Added",
    };

    // Custom styles for the button
    const customButtonStyles = 'w-36 h-7 overflow-hidden';

    return (
        <>
        <h1  className='w-full bg-zinc-800 text-center rounded-full py-2 hover:bg-zinc-700/80 cursor-pointer'>Add Friends</h1>
        <div className="w-full h-[43%] mt-5 gap-2 flex flex-wrap  overflow-scroll justify-center rounded-lg">
            {suggestedUsers.map(user => (
                <div key={user.id} className="bg-zinc-800/40 hover:bg-zinc-800/80 px-4 py-2 gap-2 flex items-center rounded-md w-80 overflow-hidden">
                    <div className='w-[20%]'>
                        <img className='w-12 h-12 object-cover rounded-full object-center' src={user.avatarUrl} alt="User avatar" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-md overflow-hidden w-48 whitespace-nowrap text-ellipsis'>
                            {user.name}
                        </h1>
                        <button onClick={() => handleFriendFunction(user.id)}>
                            <SingleButton 
                                data={friendStatus[user.id] ? addFriends : addedFriend} 
                                customClasses={customButtonStyles}
                            />
                        </button>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}

export default SuggestedUsers;
