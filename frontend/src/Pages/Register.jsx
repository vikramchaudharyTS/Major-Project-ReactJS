//@ts-nocheck
import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import instance from '../utils/axios'

function Register() {
  const navigate = useNavigate()
  const {register, handleSubmit, reset} = useForm()


  async function handleFormData(data) {
    try {
        const response = await instance.post('/register', data);
        console.log(response.data);
        reset();
        navigate('/login')
    } catch (err) {
        console.log(err.message);
    }
}

  

  return (
    <>
      <div className='w-full h-screen flex flex-col items-center justify-center'>
        <div className='w-[400px] h-fit bg-zinc-800/90 py-6 px-5 flex flex-col gap-5 items-center rounded-lg'>
          <h1 className='text-2xl font-semibold'>Register</h1>
          <p>Already have an account?  <Link className='text-sky-400 underline' to='/login'>Login</Link>  </p>

          <form className='flex flex-col gap-5 items-center w-full' onSubmit={handleSubmit(handleFormData)}>
            <input  autoCorrect="off" autoComplete="off" {...register('name')} type="text" className='bg-zinc-700/80 rounded-lg outline-none py-2 px-3 w-full mt-4' placeholder='name' />
            <input  autoCorrect="off" autoComplete="off" {...register('username')} type="text" className='bg-zinc-700/80 rounded-lg outline-none py-2 px-3 w-full ' placeholder='username' />
            <input  autoCorrect="off" autoComplete="off" {...register('email')} type="email" className='bg-zinc-700/80 rounded-lg outline-none py-2 px-3 w-full ' placeholder='email' />
            <input  autoCorrect="off" autoComplete="off" {...register('password')} type="password" className='bg-zinc-700/80 rounded-lg outline-none py-2 px-3 w-full' placeholder='password' />
            <button className='w-full py-2 bg-sky-600 rounded-lg font-semibold hover:bg-sky-500 m-4'>Register</button>
          </form>

        </div>
      </div>
    </>
  )
}

export default Register