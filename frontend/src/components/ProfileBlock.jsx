//@ts-nocheck
import SingleButton from './comp/SingleButton';
import { IoPersonAdd } from "react-icons/io5";
import { TbMessage } from "react-icons/tb";
import { useAuthStore } from '../store/authStore';
import { useParams } from 'react-router-dom';

function ProfileBlock({user, setOneBlock, oneBlock}) {
  const { error } = useAuthStore(state => state);
  const { userId } = useParams();  // Get userId from URL
  const followButtonData = {
    color: 'bg-green-500',
    hoverColor: 'hover:bg-zinc-700/70',
    heading: 'Add friend',
    icon: <IoPersonAdd />
  }
  // const user = displayedUser.user;
  const messageButtonData = {
    color: 'bg-zinc-700',
    hoverColor: 'hover:bg-sky-500/90',
    heading: 'Message',
    icon: <TbMessage />
  }
  const text = user?.bio || "no bio yet";

  // const maxChars = 200;
  // const truncatedText = text.length > maxChars ? text.substring(0, maxChars) + "..." : text;
  const maxChars = 200;
  const truncatedText = text.length > maxChars ? text.substring(0, maxChars) + "..." : text;
  if(!user) return <h1>No user found</h1>
  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='relative flex flex-col gap-4 mx-auto py-5 w-[90%] '>
      <div className=' w-full h-52 rounded-lg overflow-hidden'>
        <img className='w-full h-full object-cover object-center' src={user?.coverImg} alt="Cover" />
      </div>

      <div className='absolute left-36 top-40 border-4 w-32 h-32 rounded-full overflow-hidden shadow-lg'>
        <img className='w-full h-full object-cover object-center' src={user?.profileImg} alt="Profile" />
      </div>

      <div className='cursor-pointer  flex justify-between w-[80%] mx-auto py-1'>
        <div onClick={()=>setOneBlock(!oneBlock)} className= 'flex flex-col items-center'>
          <h1>{user?.followers?.length}</h1>
          <h1 className='font-semibold'>Followers</h1>
        </div>
        <div onClick={()=>setOneBlock(!oneBlock)} className='flex flex-col items-center '>
          <h1>{user?.following?.length}</h1>
          <h1 className='font-semibold'>Followings</h1>
        </div>
      </div>

      <h1 className=' w-full text-center p-2 font-semibold text-xl'>{user?.name }</h1>
      <h1 className=' w-full text-center -mt-5 mb-5 text-zinc-300'>@{user?.username}</h1>

      {userId ? (
        <div className='flex justify-between mb-2'>
          <SingleButton data={followButtonData} />
          <SingleButton data={messageButtonData} />
        </div>
      ) : null}

      <div className='max-h-36 h-fit overflow-hidden'>
        <p>{`Hii this is ${user.username}`}</p>
      </div>

      <div className='flex flex-col gap-3 mt-6'>
        <h1 className='font-semibold line-clamp-1 w-full'>Hobbies: {user?.hobbies}</h1>
        <h1 className='font-semibold line-clamp-1'>Interests: {user?.interests}</h1>
        <h1 className='font-semibold line-clamp-1'>Goofy Moments: {user?.goofyMoments}</h1>
        <h1 className='font-semibold line-clamp-1'>Story: {user?.story}</h1>
        <h1 className='font-semibold line-clamp-1'>Joke: {user?.joke}</h1>
      </div>
    </div>
  );
}

export default ProfileBlock;
