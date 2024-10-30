//@ts-nocheck
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Context } from '../contexts/Context';
import { auth, googleProvider } from '../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { login } = useContext(Context);

  async function handleFormData(data) {
    const { email, password } = data;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        const userData = {
          name: user.displayName || user.email,
          img: user.photoURL,
        };
        login(userData);
        reset();
        navigate('/dashboard');
      } else {
        alert("Please verify your email address before logging in.");
        auth.signOut();
      }
    } catch (err) {
      console.log("EF-F/Login", err.message);
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      const user = auth.currentUser;

      const userData = {
        name: user.displayName,
        img: user.photoURL,
      };
      login(userData);
      console.log("Google login successful");
      navigate('/dashboard');
    } catch (err) {
      console.log("EF-F/GoogleLogin", err.message);
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <div className='w-[400px] h-fit bg-zinc-800/90 py-6 px-5 flex flex-col gap-5 items-center rounded-lg'>
        <h1 className='text-2xl font-semibold'>Login</h1>
        <p>Don't have an account? <Link className='text-sky-400 underline' to='/register'>Sign up</Link></p>
        <form className='flex flex-col gap-5 items-center w-full' onSubmit={handleSubmit(handleFormData)}>
          <input
            autoCorrect="off"
            autoComplete="off"
            {...register('email')}
            type="email"
            className='bg-zinc-700/80 rounded-lg outline-none py-2 px-3 w-full mt-4'
            placeholder='email'
          />
          <input
            autoCorrect="off"
            autoComplete="off"
            {...register('password')}
            type="password"
            className='bg-zinc-700/80 rounded-lg outline-none py-2 px-3 w-full'
            placeholder='password'
          />
          <button className='w-full py-2 bg-sky-600 rounded-lg font-semibold hover:bg-sky-500 m-4'>Login</button>
        </form>
        <button onClick={handleGoogleLogin} className='w-full py-2 bg-red-600 rounded-lg font-semibold hover:bg-red-500 m-4'>
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
