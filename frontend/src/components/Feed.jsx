import React from 'react'
import Post from './Post'

function Feed() {
  return (
    <>
        <div className='mt-24 w-full flex flex-col flex-wrap items-center justify-center gap-7'>
            <Post />
            <Post />
            <Post />
           
        </div>
    </>
  )
}

export default Feed