//@ts-nocheck
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../contexts/Context';
import { RiLogoutCircleLine } from "react-icons/ri";

function LogoutButton() {

  const {setIsAuth} = useContext(Context)
  const navigate = useNavigate()

  const handleLogout = ()=>{
    setIsAuth(false)
    navigate('/login')
    console.log("Loggout out successfully");
}

  return (
    <div
      onClick={handleLogout}
      className={`px-3 py-2 items-center gap-3 text-md w-52 rounded-lg flex cursor-pointer hover:bg-zinc-700/70 hover:font-semibold`}
    >
      <div><RiLogoutCircleLine /></div>
      <h1>Logout</h1>
    </div>
  );
}

export default LogoutButton;
