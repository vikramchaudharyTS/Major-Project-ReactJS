import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // If you're using React Router

const useKeyboardNavigation = () => {
  const navigate = useNavigate(); // Hook for programmatically navigating to a route

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase(); // Convert to lowercase to avoid case sensitivity

      // Mapping of initial letters to corresponding routes
      const pageRoutes = {
        'd': '/dashboard',
        'e': '/explorer',
        'm': '/messages',
        'p': '/profile',
        'n': '/notifications',
        's': '/settings',
      };

      // Navigate to the corresponding route if a valid key is pressed
      if (pageRoutes[key]) {
        navigate(pageRoutes[key]);
      }
    };

    // Attach the keypress event listener
    window.addEventListener("keypress", handleKeyPress);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [navigate]); // Only recreate the effect when `navigate` changes
};

export default useKeyboardNavigation;
