//@ts-nocheck
import React from "react";
import { useContext } from "react";
import { Context } from "../../contexts/Context";
import { RiLogoutCircleLine } from "react-icons/ri";
import instance from "../../utils/axios";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const { setIsAuth } = useContext(Context);
  const navigate = useNavigate()
  const {setUser}=useContext(Context)

  const handleLogout = async () => {
    try {
      instance.get('/logout', { withCredentials: true })
      .then(response => {
          console.log(response.data);
      })
      .catch(error => {
          console.error('Error logging out:', error);
      });
  
        setIsAuth(false);
        navigate('/login');
        console.log("Logged out successfully");
    } catch (error) {
        console.error("Error logging out:", error.message);
        // Optionally, show a user-friendly message
    }
};

  return (
    <div
      onClick={handleLogout}
      className={`px-3 py-2 items-center gap-3 text-md w-52 rounded-lg flex cursor-pointer hover:bg-zinc-700/70 hover:font-semibold`}
    >
      <div>
        <RiLogoutCircleLine />
      </div>
      <h1>Logout</h1>
    </div>
  );
}

export default LogoutButton;
