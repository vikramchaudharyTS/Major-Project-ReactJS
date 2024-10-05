import React, { useState, useEffect } from 'react';
import Post from './Post';

const Feed = () => {

  return (
    <div className='mt-24 w-full flex flex-col flex-wrap items-center justify-center gap-7'>
      <div className='overflow-y-auto p-4'>
        <Post />
      </div>
    </div>
  );
};

export default Feed;
