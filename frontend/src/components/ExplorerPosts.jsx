import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaComment } from 'react-icons/fa'; // Import icons from react-icons
import axiosInstance from '../utils/axios.js'

// Function to calculate the optimal layout for images
const calculateLayout = (images) => {
  const columns = [];
  const columnCount = 3; // Number of columns in the grid
  const columnHeights = Array(columnCount).fill(0); // Initial heights of the columns

  images.forEach((image) => {
    // Find the column with the minimum height
    const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));

    // Place the image in the column with the minimum height
    if (!columns[minHeightIndex]) {
      columns[minHeightIndex] = [];
    }
    columns[minHeightIndex].push(image);

    // Update the height of the column
    columnHeights[minHeightIndex] += image.height; // Add image height to the column height
  });

  return columns;
};

// Function to get the image height from a URL
const getImageHeight = async (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img.height);
    img.onerror = reject; // Handle errors
    img.src = url;
  });
};

const ExplorerPosts = () => {
  const [layout, setLayout] = useState([]);
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    // Async function to fetch posts from the backend
<<<<<<< HEAD
   const fetchPosts = async () => {
    try {
        const response = await axiosInstance.get('/posts/explorer/posts');
        const posts = response.data;

        // Filter out posts with null userId
        const validPosts = posts.filter((post) => post.userId && post.userId.name);

        const imagesWithHeights = await Promise.all(
            validPosts.map(async (post) => ({
                name: post.userId.name,
                img: post.images[0], // Assuming we just need the first image
                height: await getImageHeight(post.images[0]), // Get the height of the image
            }))
=======
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/posts/explorer/posts');
        
        const posts = await response.data;

        // Extract the image URLs from the posts
        const imagesWithHeights = await Promise.all(
          posts.map(async (post) => ({
            name: post.userId.name,
            img: post.images[0], // Assuming we just need the first image
            height: await getImageHeight(post.images[0]), // Get the height of the image
          }))
>>>>>>> c926153dda1e39373ff5a8080aced0043432b4ec
        );

        setImages(imagesWithHeights); // Store images in state
        setLayout(calculateLayout(imagesWithHeights)); // Calculate layout based on image heights
<<<<<<< HEAD
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

=======
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
>>>>>>> c926153dda1e39373ff5a8080aced0043432b4ec

    fetchPosts();
  }, []);

  // Handle like button click
  const handleLikeClick = (imageToRemove) => {
    const updatedImages = images.filter((image) => image !== imageToRemove);
    setImages(updatedImages);
    setLayout(calculateLayout(updatedImages));
  };

  return (
    <div className='w-full flex flex-col flex-wrap items-start justify-center gap-7'>
      <div className='overflow-y-auto p-4'>
        <div className='flex  gap-4'>
          {layout.map((column, columnIndex) => (
            <div key={columnIndex} className='flex flex-col  gap-4'>
              {column.map((item, index) => (
                <div key={index} className='bg-zinc-800 max-w-[40vw] text-left hover:scale-[102%] transition-transform rounded-lg overflow-hidden flex flex-col'>
                  <h1 className='px-3 py-2 font-semibold'>{item.name}</h1>
                  <div className='flex justify-center items-center px-2'>
                    <img className='w-full h-auto object-cover' src={item.img} alt={item.name} />
                  </div>
                  <div className='flex justify-between items-center p-2'>
                    <div className='flex space-x-2'>
                      <button
                        className='text-blue-500'
                        onClick={() => handleLikeClick(item)}
                      >
                        <FaThumbsUp />
                      </button>
                      <button className='text-blue-500'>
                        <FaComment />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorerPosts;
