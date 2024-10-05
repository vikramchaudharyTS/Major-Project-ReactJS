import React, { useEffect, useState } from 'react'
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import { GrShare } from "react-icons/gr";

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
  const [layout, setLayout] = useState([]);
  const [images, setImages] = useState([]);
  const [activeCommentItem, setActiveCommentItem] = useState(null); // Track active comment input for each post

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
            img: "https://images.unsplash.com/photo-1541260894924-7ff059b93d54?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8fA%3D%3D"
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

                <img src={item.img} alt={item.name} className='w-full object-cover object-center px-2' />

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
