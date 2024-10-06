import React from 'react'
import { GrFingerPrint } from "react-icons/gr";
import { Link } from 'react-router-dom';

function LandingPage() {

  return (
    <>
    
        <div className='flex flex-col h-full'>

          <nav className='flex items-center justify-between p-4 mb-2'>
            <div className='flex items-center gap-4 text-xl'>
              <GrFingerPrint className='text-4xl' />
              <h1>Vault</h1>
            </div>
              <div className='flex gap-7'>
                <Link to='/register'><button className='bg-sky-700 hover:bg-sky-600 px-3 py-1 rounded-lg '>Sign up</button></Link>
                <Link to='/login'><button className='mr-3 hover:bg-green-700 px-3 py-1 rounded-lg'>Login</button></Link>
              </div>
          </nav><hr />

          <div className='flex flex-col items-center justify-center h-96'>
            <h1 className='text-7xl'>Welcome to <strong>Vault</strong></h1>
            <h1 className='text-2xl'>We don't offer you privacy here....</h1>
            <h1>It's your Right!</h1>
          </div>
        </div>
    
    </>
  )
}

export default LandingPage