import React, { useEffect, useState } from 'react';
import { auth } from '../config/firebase'; // Adjust the import path as necessary
import { sendEmailVerification } from 'firebase/auth'; // Ensure this import is correct
import { useNavigate } from 'react-router-dom';

function EmailVerification() {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    const checkVerification = () => {
      if (user) {
        user.reload().then(() => {
          if (user.emailVerified) {
            setIsVerified(true); // Set verification status
          }
        }).catch(err => {
          console.error("Error checking verification status:", err);
          setError("Could not verify your email status. Please try again.");
        });
      }
    };

    const interval = setInterval(checkVerification, 3000); // Check every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [user]);

  const handleResendEmail = async () => {
    if (user) {
      try {
        await sendEmailVerification(user);
        alert('Verification email sent! Please check your inbox.');
      } catch (err) {
        console.error("Error sending verification email:", err);
        setError("Failed to send verification email. Please try again.");
      }
    }
  };

  const handleLogin = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <div className='w-[400px] h-fit bg-zinc-800/90 py-6 px-5 flex flex-col gap-5 items-center rounded-lg'>
        <h1 className='text-2xl font-semibold'>Verify Your Email</h1>
        {isVerified ? (
          <div>
            <p className='text-green-500'>Your email has been verified!</p>
            <button 
              onClick={handleLogin} 
              className='mt-4 py-2 px-4 bg-sky-600 rounded-lg font-semibold hover:bg-sky-500'>
              Go to Login
            </button>
          </div>
        ) : (
          <div>
            <p>Please check your email to verify your account before logging in.</p>
            {error && <p className='text-red-500'>{error}</p>}
            <button 
              onClick={handleResendEmail} 
              className='mt-4 py-2 px-4 bg-sky-600 rounded-lg font-semibold hover:bg-sky-500'>
              Resend Verification Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailVerification;
