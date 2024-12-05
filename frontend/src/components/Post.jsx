import React, { useEffect } from "react";
import axiosInstance from "../utils/axios.js";
import { FcLike } from "react-icons/fc";
import { GiSaveArrow } from "react-icons/gi";
import { AiOutlineMessage } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useAuthStore } from "../store/authStore.js";
import { usePostStore } from "../store/postsStore.js";

const Posts = () => {
  const { user } = useAuthStore();
  const { posts, setPosts, removePost, savedPosts, toggleSavedPost } = usePostStore();
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${user._id}`);
        setPosts(response.data);
      } catch (err) {
        console.error("Failed to load posts.", err);
      }
    };
    if (user._id) {
      fetchPosts();
    }
  }, [user._id, setPosts]);

  const handleLikePost = async (postId, post) => {
    try {
      const response = await axiosInstance.put(`/posts/like/${postId}`);
      const updatedPost = { ...post, likes: response.data.likes };
      usePostStore.getState().updatePost(updatedPost); // Use updatePost to update the specific post
    } catch (err) {
      console.error("Error liking post", err.message);
    }
  };

  const handleSavePost = async (postId) => {
    try {
      const response = await axiosInstance.put(`/posts/save/${postId}`);
      if (response.statusText === "OK") {
        toggleSavedPost(postId); // Toggle the saved status for this post
      }
      console.log("post saved", postId);
    } catch (err) {
      console.error("Error saving post", err);
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      await axiosInstance.post(`/comments/${postId}`, { text: comment });
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

  const handleDeletePost = async (postId) => {
    console.log(postId);
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      try {
        await axiosInstance.delete(`/posts/delete/${postId}`);
        removePost(postId);
      } catch (err) {
        console.error("Error deleting post", err.message);
      }
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
              src={user.profileImg || "https://via.placeholder.com/50"}
              alt={user.username}
              className="cursor-pointer w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-grow">
              <span className="font-semibold cursor-pointer">{user.username}</span>
              <span className="text-gray-500 text-sm ml-2">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            {user._id === post.userId._id && (
              <button
                onClick={() => handleDeletePost(post.id)}
                className="text-red-500 hover:text-red-700"
              >
                <MdDelete />
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

            <button
              className="text-gray-500 hover:text-blue-500 flex items-center space-x-1"
              onClick={() => handleComment(post.id, "Your comment here")}
            >
              <AiOutlineMessage /> <span>{post.comments?.length}</span>
            </button>
            <button
              className={`hover:text-blue-500 ${
                savedPosts[post.id] ? "text-green-500" : "text-gray-500"
              }`}
              onClick={() => handleSavePost(post.id)}
            >
              <GiSaveArrow />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
