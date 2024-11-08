import React from 'react';
import ExtremeRightBar from '../components/ExtremeRightBar';
import MessagesBox from '../components/MessagesBox';

function Messages() {
  return (
    <div className='w-full h-screen px-10 rounded-lg flex justify-between'>
      <div className='w-[28%]'>
        <ExtremeRightBar />
      </div>
      <div className='w-[68%] h-[88%] my-24 mr-10 overflow-hidden bg-zinc-700 rounded-lg'>
        <MessagesBox />
      </div>
    </div>
  );
}

export default Messages;
