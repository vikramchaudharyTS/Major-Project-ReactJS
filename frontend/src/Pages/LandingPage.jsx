//@ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { GrFingerPrint } from 'react-icons/gr';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="flex flex-col h-screen backdrop-filter backdrop-blur-xl rounded-xl shadow-xl overflow-hidden"
>
  {/* Navigation */}
  <nav className="flex items-center justify-between p-4 mb-2">
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex items-center gap-4 text-xl text-green-400"
    >
      <GrFingerPrint className="text-4xl" />
      <h1 className="font-bold">Vault</h1>
    </motion.div>
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex gap-7"
    >
      <Link to="/signup">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg text-white"
        >
          Sign Up
        </motion.button>
      </Link>
      <Link to="/login">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-emerald-500 hover:bg-emerald-600 px-3 py-1 rounded-lg text-white"
        >
          Login
        </motion.button>
      </Link>
    </motion.div>
  </nav>
  <hr />

  {/* Welcome Message */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="flex flex-col items-center justify-center h-96"
  >
    <h1 className="text-7xl text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text font-extrabold mb-4 text-center">
      Welcome to <strong>Vault</strong>
    </h1>
    <h2 className="text-2xl text-gray-300 text-center">
      We don't offer you privacy
    </h2>
    <h3 className="text-xl text-gray-400 text-center">It's your Right!</h3>
  </motion.div>
</motion.div>

  );
}

export default LandingPage;
