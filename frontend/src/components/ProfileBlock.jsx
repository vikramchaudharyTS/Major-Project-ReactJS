import React, { useEffect } from 'react';
import SingleButton from './comp/SingleButton';
import { IoPersonAdd } from "react-icons/io5";
import { TbMessage } from "react-icons/tb";
import { useAuthStore } from '../store/authStore';
import { useParams } from 'react-router-dom';

function ProfileBlock(props) {
  const { fetchUserData, fetchAnotherUserData, isLoading, error, currentUser } = useAuthStore(state => state); 
  const { userId } = useParams();  // Get userId from URL

  const followButtonData = {
    color: 'bg-green-500',
    hoverColor: 'hover:bg-zinc-700/70',
    heading: 'Add friend',
    icon: <IoPersonAdd/>
  }
  
  const messageButtonData = {
    color: 'bg-zinc-700',
    hoverColor: 'hover:bg-sky-500/90',
    heading: 'Message',
    icon: <TbMessage/>
  }
  const text = props.user?.bio || "no bio yet";
  
  const maxChars = 200; 
  const truncatedText = text.length > maxChars ? text.substring(0, maxChars) + "..." : text;

  useEffect(() => {
    console.log(props);
    if (userId === currentUser?.id) {
      fetchUserData();  // Fetch logged-in user's data
    } else {
      fetchAnotherUserData(userId);  // Fetch other user's data
    }
  }, [userId, currentUser, fetchUserData, fetchAnotherUserData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='relative flex flex-col gap-4 mx-auto py-5 w-[90%] '>
      <div className=' w-full h-52 rounded-lg overflow-hidden'>
        <img className='w-full h-full object-cover object-center' src={props.user?.coverPhoto} alt="Cover" />
      </div>
      
      <div className='absolute left-36 top-40 border-4 w-32 h-32 rounded-full overflow-hidden shadow-lg'>
        <img className='w-full h-full object-cover object-center' src={props.user?.profileImg} alt="Profile" />
      </div>

      <div className='flex justify-between w-[80%] mx-auto py-1'>
        <div className='flex flex-col items-center'>
          <h1>{props.user?.followers?.length}</h1>
          <h1 className='font-semibold'>Followers</h1>
        </div>
        <div className='flex flex-col items-center'>
          <h1>{props.user?.following?.length}</h1>
          <h1 className='font-semibold'>Followings</h1>
        </div>
      </div>

      <h1 className=' w-full text-center p-2 font-semibold text-xl'>{props.user?.name}</h1>
      <h1 className=' w-full text-center -mt-5 mb-5 text-zinc-300'>@{props.user?.username}</h1>

      {props.user?.id !== currentUser?.id && (
        <div className='flex justify-between mb-2'>
          <SingleButton data={followButtonData} />
          <SingleButton data={messageButtonData} />
        </div>
      )}

      <div className='max-h-36 h-fit overflow-hidden'>
        <p>{truncatedText}</p>
      </div>

      <div className='flex flex-col gap-3 mt-6'>
        <h1 className='font-semibold line-clamp-1 w-full'>Hobbies: {props.user?.hobbies}</h1>
        <h1 className='font-semibold line-clamp-1'>Interests: {props.user?.interests}</h1>
        <h1 className='font-semibold line-clamp-1'>Goofy Moments: {props.user?.goofyMoments}</h1>
        <h1 className='font-semibold line-clamp-1'>Story: {props.user?.story}</h1>
        <h1 className='font-semibold line-clamp-1'>Joke: {props.user?.joke}</h1>
      </div>
    </div>
  );
}

export default ProfileBlock;
