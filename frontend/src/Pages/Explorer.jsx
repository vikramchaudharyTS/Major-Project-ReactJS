import React from 'react';
import ExplorerPosts from '../components/ExplorerPosts.jsx';

function Explorer() {
  return (
    <div className='w-full px-10 rounded-lg mt-20'>
      <div className='w-full h-[91vh] overflow-y-auto'>
      <ExplorerPosts />
      </div>
    </div>
  );
}

export default Explorer;
