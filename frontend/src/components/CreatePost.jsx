import React from "react";

const CreatePost = ({isCreatePostActive, setIsCreatePostActive}) => {
  
  return (
    <div className="fixed inset-0 bg-zinc-900 backdrop-blur-md bg-opacity-45  flex justify-center items-center z-[55] text-white">
      <div className="bg-zinc-800/80 rounded-lg w-1/2 p-6">
        {/* Navbar Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img src="https://via.placeholder.com/50" alt="" className="rounded-full w-10 h-10" />
            <div>
              <h3 className="text-md font-semibold">Name</h3>
              <span className="text-sm text-zinc-400" id="postDate">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
          <button onClick={()=>setIsCreatePostActive(!isCreatePostActive)} className="text-gray-500 hover:text-gray-700 text-lg">&times;</button>
        </div>

        {/* Form Section */}
        <form className="space-y-4">
          <div>
            <textarea name="desc" id="postContent" placeholder="What's happening?" className="w-full px-3 py-2 rounded-md bg-zinc-800 opacity-60 outline-none" >
            </textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Add Image
            </label>
            <input name="img" type="file" id="postImage" className="block w-full text-sm text-zinc-500" />
          </div>
          <div className="flex justify-end space-x-2">
            <button onClick={()=>setIsCreatePostActive(!isCreatePostActive)} type="button" className="bg-zinc-700 text-white px-4 py-2 rounded-full hover:bg-zinc-600">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-700" >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
