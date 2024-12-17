//@ts-nocheck
import React, { useState } from "react";
import axiosInstance from "../utils/axios.js";
import { usePostStore } from "../store/postsStore.js";
import { useAuthStore } from "../store/authStore.js";

const CreatePost = ({ isCreatePostActive, setIsCreatePostActive }) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // For image preview
  const [isLoading, setIsLoading] = useState(false);
  const { addPost } = usePostStore();
  const { user } = useAuthStore();

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Generate a preview URL for the selected file
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
    formData.append("images", image);
    formData.append("isPublic", true);
  
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response data:", response.data);
      console.log("Response status:", response.status);
      
      if (response.status === 201 || response.status === 200) {
        addPost(response.data); // Add the new post to the store
        setDescription("");
        setImage(null);
        setPreviewImage(null);
        setIsCreatePostActive(false);
      } else {
        alert("Unexpected response from server. Post creation may not be successful.");
      }
    } catch (error) {
      console.error("Error creating post:", error.response || error.message);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
    
  };
  

  return (
    <div className="fixed inset-0 bg-zinc-900 backdrop-blur-md bg-opacity-45 flex justify-center items-center z-[55] text-white">
      <div className="bg-zinc-800/80 rounded-lg w-1/2 p-6">
        {/* Navbar Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img src={user.profileImg} alt="" className="rounded-full w-10 h-10" />
            <div>
              <h3 className="text-md font-semibold">{user.username}</h3>
              <span className="text-sm text-zinc-400" id="postDate">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsCreatePostActive(!isCreatePostActive)}
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            &times;
          </button>
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
            <label className="block text-sm font-medium text-white">Add Image</label>
            <input
              name="images"
              type="file"
              id="postImage"
              className="block w-full text-sm text-zinc-500"
              onChange={handleImageChange}
              accept="image/*" // Restrict to image files
            />
          </div>

          {/* Image Preview */}
          {previewImage && (
            <div className="mt-4">
              <h4 className="text-sm text-zinc-400">Image Preview:</h4>
              <img
                src={previewImage}
                alt="Preview"
                className="w-full max-h-60 object-contain rounded-md mt-2"
              />
            </div>
          )}

          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setIsCreatePostActive(!isCreatePostActive)}
              type="button"
              className="bg-zinc-700 text-white px-4 py-2 rounded-full hover:bg-zinc-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-700 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin border-t-2 border-b-2 border-white h-5 w-5 rounded-full"></div>
              ) : (
                "Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
