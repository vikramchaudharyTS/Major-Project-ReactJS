import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaComment } from 'react-icons/fa'; // Import icons from react-icons
import axiosInstance from '../utils/axios.js';
import { useNavigate } from 'react-router-dom';

const ExplorerPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/posts/explorer/posts');
        const fetchedPosts = response.data;

        // Filter valid posts
        const validPosts = Array.isArray(fetchedPosts)
          ? fetchedPosts.filter(
              (post) =>
                post.userId &&
                post.userId.name &&
                post.images[0] &&
                post.images[0].startsWith('http')
            )
          : [];

        setPosts(validPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchPosts();
  }, []);
  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };
  if (loading) {
    return <div>Loading posts...</div>; // Show loading message
  }

  if (posts.length === 0) {
    return <div>No posts available. Start exploring!</div>; // Handle no posts
  }

  return (
    <div className="w-full flex flex-col items-start justify-center gap-7">
      <div className="overflow-y-auto p-4">
        <div className="grid grid-cols-3 gap-4"> {/* Grid layout for posts */}
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-zinc-800 text-left hover:scale-[102%] transition-transform rounded-lg overflow-hidden flex flex-col"
            >
              <h1 onClick={()=>handleUserClick(post.userId._id)} className="px-3 py-2 font-semibold cursor-pointer">{post.userId.name}</h1>
              <div className="flex justify-center items-center px-2">
                <img
                  className="w-full h-auto object-cover"
                  src={post.images[0]}
                  alt={post.userId.name}
                />
              </div>
              <div className="flex justify-between items-center p-2">
                <div className="flex space-x-2">
                  <button className="text-blue-500">
                    <FaThumbsUp />
                  </button>
                  <button className="text-blue-500">
                    <FaComment />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorerPosts;
