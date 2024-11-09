import React from 'react';

const Post = () => {
  return (
    <div className="border border-gray-300 rounded-lg shadow-md my-4 bg-zinc-800">
      <div className="flex items-center p-4">
        <img src='https://images.unsplash.com/photo-1648740366598-7fb7c5e73fa5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='Vikram' className="w-10 h-10 rounded-full mr-3" />
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
      <div className="p-4 border-t border-gray-200">
        <p className="text-gray-800">{'content'}</p>
      </div>
      <div className="p-4">
        {/* {image && (
          <img src={image} alt="Post content" className="w-full rounded-lg" />
        )} */}
      </div>
      <div className="flex justify-between p-4 border-t border-gray-200">
        <button className="text-gray-500 hover:text-blue-500">Like</button>
        <button className="text-gray-500 hover:text-blue-500">Share</button>
        <button className="text-gray-500 hover:text-blue-500">Save</button>
        <button className="text-gray-500 hover:text-blue-500">Comments</button>
      </div>
    </div>
  );
};

export default Post;