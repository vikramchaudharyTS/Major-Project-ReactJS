import React from 'react';
import { FcLike } from "react-icons/fc";
import { IoShareSocialOutline } from "react-icons/io5";
import { GiSaveArrow } from "react-icons/gi";
import { AiOutlineMessage } from "react-icons/ai";

const Post = () => {
  return (
    <div className="border border-gray-300 rounded-lg shadow-md bg-zinc-800">


      <div className="flex items-center p-4">

        <img src='https://images.unsplash.com/photo-1729608462362-21193b628e56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8' alt='Vikram' className="w-10 h-10 rounded-full mr-3" />

        <div className="flex-grow">
          <span className="font-semibold">dychord_</span>
          <span className="text-gray-500 text-sm ml-2">2 hours ago</span>
        </div>

        <button className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

      </div>


      <div className="px-2 py-2 border-t border-gray-200">
        <p className="text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt nihil nisi ullam! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque sunt exercitationem libero! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ipsum mollitia odio. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat non nam delectus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio quis ea earum quae dolor, vero commodi placeat mollitia asperiores voluptate amet laborum eligendi ab maiores assumenda consequuntur officia dolorem, vel quos, accusamus culpa. Corrupti tempora quas fuga nihil sit accusamus cupiditate, vitae voluptates molestias commodi!</p>
      </div>
      <div className="p-2 w-full ">
        {/* {image && ( */}
        <img src='https://images.unsplash.com/photo-1729608462362-21193b628e56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8' alt="Post content" className="w-full h-full rounded-lg" />

      </div>


      <div className="flex justify-between p-4 border-t border-gray-200">
        <button className="text-gray-500 hover:text-blue-500"><FcLike /></button>
        <button className="text-gray-500 hover:text-blue-500"><IoShareSocialOutline /></button>
        <button className="text-gray-500 hover:text-blue-500"><GiSaveArrow /></button>
        <button className="text-gray-500 hover:text-blue-500"><AiOutlineMessage /></button>
      </div>
    </div>
  );
};

export default Post;