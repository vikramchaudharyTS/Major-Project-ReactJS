import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore"; // Import your auth store

const useKeyboardNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Track the current page location
  const { logout } = useAuthStore(); // Assuming you have a `logout` function in your auth store

  useEffect(() => {
    // If the current page is login, signup, or landing, do not enable keyboard navigation
    if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/') {
      return;
    }

    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase(); // Convert to lowercase to avoid case sensitivity
      const isShiftPressed = e.shiftKey; // Check if Shift key is pressed

      // Check if the user is focused on an input or textarea
      const activeElement = document.activeElement;
      const isEditing =
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        activeElement?.isContentEditable;

      if (isEditing) {
        return; // Ignore key presses when editing
      }

      // Handle page navigation based on the key pressed
      const pageRoutes = {
        'd': '/dashboard',
        'e': '/explorer',
        'm': '/messages',
        'p': '/profile',
        'n': '/notifications',
        's': '/settings',
      };

      // Check if a valid key is pressed for page navigation
      if (pageRoutes[key]) {
        navigate(pageRoutes[key]);
      }

      // Check if Shift + L is pressed to log out
      if (isShiftPressed && key === 'l') {
        logout(); // Call your logout function from the auth store
        navigate('/login'); // Redirect to the login page after logout
      }
    };

    // Add event listener for key press
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate, logout, location.pathname]); // Depend on location.pathname to check for route changes
};

export default useKeyboardNavigation;
