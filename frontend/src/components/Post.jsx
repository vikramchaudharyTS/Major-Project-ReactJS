import React, { useEffect } from "react";
import axiosInstance from "../utils/axios.js";
import { FcLike } from "react-icons/fc";
import { IoShareSocialOutline } from "react-icons/io5";
import { GiSaveArrow } from "react-icons/gi";
import { AiOutlineMessage } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useAuthStore } from "../store/authStore.js";
import { usePostStore } from "../store/postsStore.js";

const Posts = () => {
  const { user } = useAuthStore();
  const { posts, setPosts, addPost, removePost } = usePostStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${user._id}`);
        setPosts(response.data);
      } catch (err) {
        console.error("Failed to load posts.", err);
      }
    };
    fetchPosts();
  }, [user._id, setPosts]);

  const handleLikePost = async (postId, post) => {
    try {
      console.log(postId);
      const response = await axiosInstance.put(`/posts/like/${postId}`);
      const updatedPost = { ...post, likes: response.data.likes }; 
      addPost(updatedPost); 
    } catch (err) {
      console.error("Error liking post", err.message);
    }
  };

  const handleSavePost = async (postId) => {
    try {
      await axiosInstance.put(`/posts/save/${postId}`);
      console.log("post saved", postId);
    } catch (err) {
      console.error("Error saving post", err);
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      const response = await axiosInstance.post(`/comments/${postId}`, { text: comment });
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

  const handleDeletePost = async (postId) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      try {
        // Delete the post from the backend
        await axiosInstance.delete(`/posts/delete/${postId}`);
        
        // Remove the post from the state (this triggers the re-render)
        removePost(postId);
      } catch (err) {
        console.error("Error deleting post", err.message);
      }
    }
  };

  const handleCreatePost = async (newPostData) => {
    try {
      const response = await axiosInstance.post("/posts/create", newPostData); 
      // If successful, add the new post to the state
      addPost(response.data);  // Assuming response contains the newly created post
    } catch (err) {
      console.error("Error creating post", err);
    }
  };

  if (!posts.length) return <div className="text-gray-400">No posts to display.</div>;

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <div key={index} className="border border-gray-300 rounded-lg shadow-md bg-zinc-800">
          {/* Post Header */}
          <div className="flex items-center p-4">
            <img
              src={post.userId.profileImg || "https://via.placeholder.com/50"}
              alt={post.userId.name}
              className=" cursor-pointer w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-grow">
              <span className="font-semibold cursor-pointer">{post.userId.name}</span>
              <span className="text-gray-500 text-sm ml-2">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            {/* Only show delete button if the post belongs to the current user */}
            {user._id === post.userId._id && (
              <button
                onClick={() => handleDeletePost(post.id)}
                className="text-red-500 hover:text-red-700"
              >
                <MdDelete />  {/* Delete Icon */}
              </button>
            )}
          </div>

          {/* Post Description */}
          <div className="px-2 py-2 border-t border-gray-200">
            <p className="text-gray-400">{post.description || "No description provided."}</p>
          </div>

          {/* Post Images */}
          <div className="p-2 w-full space-y-2">
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post Image ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
            ))}
          </div>

          {/* Post Footer */}
          <div className="flex justify-between p-4 border-t border-gray-200">
            <button
              className="text-gray-500 hover:text-blue-500 flex items-center space-x-1"
              onClick={() => handleLikePost(post.id, post)} 
            >
              <FcLike /> <span>{post.likes}</span>
            </button>
            <button className="text-gray-500 hover:text-blue-500">
              <IoShareSocialOutline />
            </button>
            <button
              className="text-gray-500 hover:text-blue-500"
              onClick={() => handleSavePost(post.id)}
            >
              <GiSaveArrow />
            </button>
            <button
              className="text-gray-500 hover:text-blue-500 flex items-center space-x-1"
              onClick={() => handleComment(post.id, "Your comment here")}
            >
              <AiOutlineMessage /> <span>{post.comments?.length}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
