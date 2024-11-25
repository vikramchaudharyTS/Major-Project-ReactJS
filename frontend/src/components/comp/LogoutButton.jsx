import { useAuthStore } from "../../store/authStore.js";
import { usePostStore } from "../../store/postsStore.js"; // Import posts store
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const { logout, isLoading } = useAuthStore();
  const { resetPosts } = usePostStore(); // Destructure resetPosts from posts store

  const handleLogout = async () => {
    try {
      await logout();
      resetPosts(); // Clear posts when logging out
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
        <div className="w-6 h-6 animate-spin mx-auto"></div>
      ) : (
        <>
          <LogOut className="inline-block mr-2" />
          Logout
        </>
      )}
    </motion.button>
  );
};

export default LogoutButton;
