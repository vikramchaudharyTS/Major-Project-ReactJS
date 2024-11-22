import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios.js";
import { FcLike } from "react-icons/fc";
import { IoShareSocialOutline } from "react-icons/io5";
import { GiSaveArrow } from "react-icons/gi";
import { AiOutlineMessage } from "react-icons/ai";
import { useAuthStore } from "../store/authStore.js";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${user._id}`);
        setPosts(response.data);
      } catch (err) {
        setError("Failed to load posts.");
      }
    };
    fetchPosts();
  }, [user._id]);

  const handleLikePost = async (postId) => {
    try {
      await axiosInstance.put(`/posts/like/${postId}`);
      // Refresh posts or update UI
    } catch (err) {
      console.error("Error liking post", err);
    }
  };

  const handleSavePost = async (postId) => {
    try {
      await axiosInstance.put(`/posts/save/${postId}`);
      // Refresh posts or update UI
    } catch (err) {
      console.error("Error saving post", err);
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      await axiosInstance.post(`/comments/${postId}`, { text: comment });
      // Refresh posts or update UI
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!posts.length) return <div className="text-gray-400">No posts to display.</div>;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border border-gray-300 rounded-lg shadow-md bg-zinc-800">
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
              onClick={() => handleLikePost(post.id)}
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
              <AiOutlineMessage /> <span>{post.comments.length}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
