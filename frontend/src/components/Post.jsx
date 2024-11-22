import React, { useEffect } from "react";
import axiosInstance from "../utils/axios.js";
import { FcLike } from "react-icons/fc";
import { IoShareSocialOutline } from "react-icons/io5";
import { GiSaveArrow } from "react-icons/gi";
import { AiOutlineMessage } from "react-icons/ai";
import { useAuthStore } from "../store/authStore.js";
import { usePostStore } from "../store/postsStore.js";

const Posts = () => {
  const { user } = useAuthStore();
  const { posts, setPosts, addPost } = usePostStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${user._id}`);
        setPosts(response.data);  // Use Zustand to set the posts
      } catch (err) {
        console.error("Failed to load posts.", err);
      }
    };
    fetchPosts();
  }, [user._id, setPosts]);

  const handleLikePost = async (postId, post) => {
    try {
      const response = await axiosInstance.put(`/posts/like/${postId}`);
      const updatedPost = { ...post, likes: response.data.likes }; // Update with the new likes count
      addPost(updatedPost); // Update local state with new likes count
    } catch (err) {
      console.error("Error liking post", err);
    }
  };

  const handleSavePost = async (postId) => {
    try {
      await axiosInstance.put(`/posts/save/${postId}`);
      // Optionally update UI to reflect save
    } catch (err) {
      console.error("Error saving post", err);
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      const response = await axiosInstance.post(`/comments/${postId}`, { text: comment });
      // Optionally update UI to reflect new comment (e.g., updating comments array)
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

  if (!posts.length) return <div className="text-gray-400">No posts to display.</div>;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post} className="border border-gray-300 rounded-lg shadow-md bg-zinc-800">
          {/* Post Header */}
          <div className="flex items-center p-4">
            <img
              src={post.userId.profileImg || "https://via.placeholder.com/50"}
              alt={post.userId.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-grow">
              <span className="font-semibold">{post.userId.name}</span>
              <span className="text-gray-500 text-sm ml-2">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
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
              onClick={() => handleLikePost(post._id, post)} // Pass current post for local state update
            >
              <FcLike /> <span>{post.likes}</span>
            </button>
            <button className="text-gray-500 hover:text-blue-500">
              <IoShareSocialOutline />
            </button>
            <button
              className="text-gray-500 hover:text-blue-500"
              onClick={() => handleSavePost(post._id)}
            >
              <GiSaveArrow />
            </button>
            <button
              className="text-gray-500 hover:text-blue-500 flex items-center space-x-1"
              onClick={() => handleComment(post._id, "Your comment here")}
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
