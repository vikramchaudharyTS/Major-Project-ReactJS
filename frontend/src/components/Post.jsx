//@ts-nocheck
import React, { useContext, useEffect, useState } from 'react';
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import { GrShare } from "react-icons/gr";
import { Context } from '../contexts/Context';

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

function Post() {
  const { user } = useContext(Context);

  const [layout, setLayout] = useState([]);
  const [images, setImages] = useState([]);
  const [activeCommentItem, setActiveCommentItem] = useState(null); // Track active comment input for each post

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        if (user && user.myPosts) {
          const imagesWithHeights = await Promise.all(
            user.myPosts.map(async (item) => ({
              ...item,
              height: await getImageHeight(item.img),
            }))
          );

          setImages(imagesWithHeights);
          setLayout(calculateLayout(imagesWithHeights));
        } else {
          // Handle the case where there are no posts
          console.warn('No posts available for the user');
          setImages([]); // Set images to an empty array if no posts
          setLayout([]); // Clear the layout if no images
        }
      } catch (error) {
        console.error('Error loading image heights:', error);
      }
    };

    fetchLayout();
  }, [user]); // Include user as a dependency

  // Handle like button click
  const handleLikeClick = (imageToRemove) => {
    const updatedImages = images.filter((image) => image !== imageToRemove);
    setImages(updatedImages);
    setLayout(calculateLayout(updatedImages));
  };

  // Toggle comment input field for the selected post using the item
  const replyComment = (item) => {
    setActiveCommentItem(activeCommentItem === item ? null : item);
  };

  return (
    <>
      <div className='flex gap-4'>
        {layout.map((column, columnIndex) => (
          <div key={columnIndex} className='flex flex-col gap-3'>
            {column.map((item) => (
              <div key={item.img} className='bg-zinc-950/70 text-left rounded-lg overflow-hidden flex flex-col'>
                <div className='flex items-center justify-between'>
                  <div className='font-bold text-white py-2 px-2'>{item.name}</div>
                  <div className='px-2 text-sm'><GrShare /></div>
                </div>
                <img src={item.img} alt={item.name} className="w-full object-cover object-center px-2 max-w-[250px] flex-grow-0 flex-shrink-0" />
                <div className='flex justify-between items-center py-2 px-2 bg-zinc-950'>
                  <button onClick={() => handleLikeClick(item)}>
                    <IoMdHeartEmpty className='text-white text-xl' />
                  </button>
                  <button onClick={() => replyComment(item)}>
                    <FaRegComment className='text-white' />
                  </button>
                </div>
                {/* Show comment input if activeCommentItem matches this post */}
                {activeCommentItem === item && (
                  <div className='p-2 bg-black/50'>
                    <input type="text" className='bg-zinc-500/20 w-full py-2 text-sm rounded-lg px-3 text-white outline-none' placeholder='Type your comment' />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Post;
