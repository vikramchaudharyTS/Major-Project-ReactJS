import React, { useState } from "react";
import axiosInstance from '../utils/axios.js'; 

const CreatePost = ({ isCreatePostActive, setIsCreatePostActive }) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState([]);

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !image) {
      alert("Please add a description and an image!");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("images", image); // Correct field name here
    formData.append("isPublic", true); // Set this according to your requirements

    try {
      const response = await axiosInstance.post("/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Post created:", response.data);
      // Reset form after submission and close the modal
      setDescription('');
      setImage(null);
      setIsCreatePostActive(false);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-zinc-900 backdrop-blur-md bg-opacity-45 flex justify-center items-center z-[55] text-white">
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
          <button onClick={() => setIsCreatePostActive(!isCreatePostActive)} className="text-gray-500 hover:text-gray-700 text-lg">&times;</button>
        </div>

        {/* Form Section */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <textarea
              name="desc"
              id="postContent"
              placeholder="What's happening?"
              className="w-full px-3 py-2 rounded-md bg-zinc-800 opacity-60 outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Add Image
            </label>
            <input
              name="images" 
              type="file"
              id="postImage"
              className="block w-full text-sm text-zinc-500"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button onClick={() => setIsCreatePostActive(!isCreatePostActive)} type="button" className="bg-zinc-700 text-white px-4 py-2 rounded-full hover:bg-zinc-600">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-700">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
