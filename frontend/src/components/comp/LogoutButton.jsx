//@ts-nocheck
import { useAuthStore } from "../../store/authStore.js";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react"; // Optional icon

const LogoutButton = () => {
  const { logout, isLoading, user } = useAuthStore();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleLogout}
      className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="w-6 h-6 animate-spin mx-auto"> {/* Add a loading spinner here if needed */}</div>
      ) : (
        <>
          <LogOut className="inline-block mr-2" /> {/* Logout icon */}
          Logout
        </>
      )}
    </motion.button>
  );
};

export default LogoutButton;
