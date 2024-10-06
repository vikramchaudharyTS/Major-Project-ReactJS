//@ts-nocheck
import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import instance from '../utils/axios'

function Login() {
  const navigate = useNavigate()
  const {register, handleSubmit, reset} = useForm()


  async function handleFormData(data) {
    try {
        const response = await instance.post('/login', data);
        console.log(response.data);
        reset();
        navigate('/dashboard')
    } catch (err) {
        console.log(err.message);
    }
}

  

  return (
    <>
      <div className='w-full h-screen flex flex-col items-center justify-center'>
        <div className='w-[400px] h-fit bg-zinc-800/90 py-6 px-5 flex flex-col gap-5 items-center rounded-lg'>
          <h1 className='text-2xl font-semibold'>Login</h1>
          <p>Don't have an account?  <Link className='text-sky-400 underline' to='/register'>Sign up</Link>  </p>

          <form className='flex flex-col gap-5 items-center w-full' onSubmit={handleSubmit(handleFormData)}>
            <input {...register('username')} type="username" className='bg-zinc-700/80 rounded-lg outline-none py-2 px-3 w-full mt-4' placeholder='username' />
            <input {...register('password')} type="password" className='bg-zinc-700/80 rounded-lg outline-none py-2 px-3 w-full' placeholder='password' />
            <button className='w-full py-2 bg-sky-600 rounded-lg font-semibold hover:bg-sky-500 m-4'>Login</button>
          </form>

        </div>
      </div>
    </>
  )
}

export default Login