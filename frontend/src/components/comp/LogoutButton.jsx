//@ts-nocheck
import React, { useContext } from "react";
import { Context } from "../../contexts/Context";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const { logout } = useContext(Context); // Get logout function from context
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from context
      navigate('/login'); // Redirect to login page
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
