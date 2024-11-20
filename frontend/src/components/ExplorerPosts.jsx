import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaComment } from 'react-icons/fa'; // Import icons from react-icons

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
    // Async function to fetch image heights and calculate layout
    const fetchLayout = async () => {
      const data = [
        {
            name: "Vikram",
            img: "https://images.unsplash.com/photo-1591980607210-8ea99bee96f0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            name: "John",
            img: "https://images.unsplash.com/photo-1514353456378-94e73f7204b5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            name: "Scott",
            img: "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            name: "Michael",
            img: "https://images.unsplash.com/photo-1492288991661-058aa541ff43?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            name: "Alice",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            name: "Eve",
            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            name: "Bob",
            img: "https://images.unsplash.com/photo-1495638488670-437e54b3bab4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            name: "Charlie",
            img: "https://images.unsplash.com/photo-1541260894924-7ff059b93d54?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8"
          },
          {
            name: "Dave",
            img: "https://images.unsplash.com/photo-1531074823428-3dd8856acd45?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            name: "Grace",
            img: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            name: "Henry",
            img: "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D"
          },
          {
            name: "Isabella",
            img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D"
          },
          {
            name: "Jack",
            img: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D"
          }
      ]

      try {
        // Get heights of all images
        const imagesWithHeights = await Promise.all(
          data.map(async (item) => ({
            ...item,
            height: await getImageHeight(item.img),
          }))
        );

        setImages(imagesWithHeights); // Store images in state
        setLayout(calculateLayout(imagesWithHeights));
      } catch (error) {
        console.error('Error loading image heights:', error);
      }
    };

    fetchLayout();
  }, []);

  // Handle like button click
  const handleLikeClick = (imageToRemove) => {
    const updatedImages = images.filter((image) => image !== imageToRemove);
    setImages(updatedImages);
    setLayout(calculateLayout(updatedImages));
  };

  return (
    <div className=' w-full flex flex-col flex-wrap items-center justify-center gap-7'>
      <div className=' overflow-y-auto p-4'>
        <div className='flex gap-4'>
          {layout.map((column, columnIndex) => (
            <div key={columnIndex} className='flex flex-col gap-4'>
              {column.map((item, index) => (
                  <div key={index} className='bg-zinc-800 text-left rounded-lg overflow-hidden flex flex-col'>
                    <h1 className=' px-3 py-2 font-semibold'>{item.name}</h1>
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
