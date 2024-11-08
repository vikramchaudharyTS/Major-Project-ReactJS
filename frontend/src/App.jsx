import React from 'react';
import FloatingShape from './components/FloatingShape';
import Routing from './utils/Routing.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      {/* Full-screen background with floating shapes
      <div className='relative overflow-hidden'>
        <div className='min-h-screen bg-zinc-900 from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center'>
          <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5' left='10%' delay={0} />
          <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
          <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
        </div>
      </div> */}

      {/* Routing component centered on the screen */}
      <div className='bg-zinc-900 text-white'>
        <Routing />
      </div>

      <Toaster />
    </>
  );
}

export default App;
