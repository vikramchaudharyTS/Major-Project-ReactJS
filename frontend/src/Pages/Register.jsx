//@ts-nocheck
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Context } from '../contexts/Context';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState(null);

  async function handleFormData(data) {
    const { email, username, password, name } = data;
    try {
      // Register user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set additional user details if needed, like username (consider Firestore for storing additional details)

      // Send verification email
      await sendEmailVerification(user);
      console.log('Verification email sent to:', email);

      // Redirect to email verification page
      reset();
      navigate('/email-verification');
    } catch (err) {
      setError(err.message);
      console.log("EF-F/Register", err.message);
    }
  }

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <div className='w-[400px] h-fit bg-zinc-800/90 py-6 px-5 flex flex-col gap-5 items-center rounded-lg'>
        <h1 className='text-2xl font-semibold'>Register</h1>
        <p>Already have an account? <Link className='text-sky-400 underline' to='/login'>Login</Link></p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form className='flex flex-col gap-5 items-center w-full' onSubmit={handleSubmit(handleFormData)}>
          <input
            autoCorrect="off"
            autoComplete="off"
            {...register('name')}
            type="text"
            className='bg-zinc-700/80 rounded-lg outline-none py-2 px-3 w-full mt-4'
            placeholder='name'
          />
          <input
            autoCorrect="off"
            autoComplete="off"
            {...register('email')}
            type="email"
            className='bg-zinc-700/80 rounded-lg outline-none py-2 px-3 w-full'
            placeholder='email'
          />
          <input
            autoCorrect="off"
            autoComplete="off"
            {...register('username')}
            type="text"
            className='bg-zinc-700/80 rounded-lg outline-none py-2 px-3 w-full'
            placeholder='username'
          />
          <input
            autoCorrect="off"
            autoComplete="off"
            {...register('password')}
            type="password"
            className='bg-zinc-700/80 rounded-lg outline-none py-2 px-3 w-full'
            placeholder='password'
          />
          <button className='w-full py-2 bg-sky-600 rounded-lg font-semibold hover:bg-sky-500 m-4'>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
