//@ts-nocheck
import { create } from 'zustand'
import axiosInstance from '../utils/axios';
import { API_USER_ACTIONS_URL, API_AUTH_URL } from '../utils/urls';


export const useAuthStore = create((set) => ({

    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    suggestedUsers: [],
    friendStatus: {},
    isFetchingSuggestedUsers: false,
    isTogglingFollowStatus: false,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.post(`${API_AUTH_URL}/signup`, { email, password, name });
            // console.log("Signup response:", response);
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            console.error("EF-F/authStore Signup error:", error);  // Debugging line
            console.error("Signup error:", error);
            set({ error: error.response?.data?.message || "Error Signing up", isLoading: false });
            throw error;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        // console.log("Logging in with:", email, password);  // Debugging line
        try {
            const response = await axiosInstance.post(`${API_AUTH_URL}/login`, { email, password });
            console.log("Login response:", response.data.user);  // Debugging line
            set({ user: response.data.user, isAuthenticated: true, isLoading: false, error: null });
        } catch (error) {
            console.error("EF-F/authStore Login error:", error);  // Debugging line
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }
    },


    logout: async () => {
        set({ isLoading: true, error: null })
        try {
            await axiosInstance.post(`${API_AUTH_URL}/logout`)
            set({ user: null, isAuthenticated: false, error: null, isLoading: false })
        } catch (error) {
            console.error("EF-F/authStore Logout error:", error);  // Debugging line
            set({ error: "Error Logging you out", isLoading: false })
            throw error
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.post(`${API_AUTH_URL}/verify-email`, { code })
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
            return response.data
        } catch (error) {
            console.error("EF-F/authStore verifyEmail error:", error);  // Debugging line
            set({ error: error.response.data.message || "Verifying emial error", isLoading: false })
            throw error
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axiosInstance.get(`${API_AUTH_URL}/check-auth`);
            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false,
                isCheckingAuth: false,
            });
        } catch (error) {
            console.error("EF-F/authStore checkAuth error:", error);  // Debugging line
            set({
                error: null,
                isCheckingAuth: false,
                isAuthenticated: false,
            });
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {

            // Step 1: Check if the email exists in the database
            const user = await axiosInstance.post(`${API_AUTH_URL}/find-user-by-email`, { email });

            // Step 2: If email exists, send the reset password email
            if (user.data.exists) {
                await axiosInstance.post(`${API_AUTH_URL}/forgot-password`, { email });
                set({ message: "Password reset email sent", isLoading: false });
            } else {
                set({
                    isLoading: false,
                    error: "Email not found in our database",
                });
            }
        } catch (error) {
            console.error("EF-F/authStore forgotPassword error:", error);  // Debugging line
            set({
                isLoading: false,
                error: error.response?.data?.message || "Error sending reset password email",
            });
        }
    },

    resetPassword: async (token, password, confirmPassword) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.post(`${API_AUTH_URL}/reset-password/${token}`, {
                newPassword: password,
                confirmNewPassword: confirmPassword
            });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            console.error("EF-F/authStore resetPassword error:", error);  
            set({
                isLoading: false,
                error: error.response.data.message || "Error resetting password",
            });
            throw error;
        }
    },

    fetchSuggestedUsers: async () => {
        set({ isFetchingSuggestedUsers: true, error: null });
        try {
            const response = await axiosInstance.get(`${API_USER_ACTIONS_URL}/suggested`);
            const initialStatus = response.data.reduce((acc, user) => {
                acc[user._id] = false;
                return acc;
            }, {});
            set({
                suggestedUsers: response.data,
                friendStatus: initialStatus,
                isFetchingSuggestedUsers: false,
            });
        } catch (error) {
            console.error("Error fetching suggested users:", error);
            set({ error: "Error fetching suggested users", isFetchingSuggestedUsers: false });
        }
    },

    toggleFollowStatus: async (userId) => {
        const currentStatus = useAuthStore.getState().friendStatus[userId];
        if (currentStatus === undefined) return; // Avoid toggling if status is undefined

        set({ isTogglingFollowStatus: true });
        try {
            await axiosInstance.post(`${API_USER_ACTIONS_URL}/followUnfollowUser/${userId}`);
            set((state) => ({
                friendStatus: { ...state.friendStatus, [userId]: !currentStatus },
                isTogglingFollowStatus: false,
            }));
        } catch (error) {
            console.error("Error toggling follow status:", error);
            set({ error: "Error toggling follow status", isTogglingFollowStatus: false });
        }
    },
    fetchUserData: async () => {
        if (!useAuthStore.getState().user) {
            set({ isLoading: true, error: null });
            try {
                const response = await axiosInstance.get(`${API_USER_ACTIONS_URL}/profile`);
                set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            } catch (error) {
                console.error("Error fetchingUserData:", error);
                set({ error: 'Error fetching user data', isLoading: false });
            }
        }
    },
    fetchAnotherUserData: async (userId) => {
        if (!userId) return;  // Check if userId exists
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`${API_USER_ACTIONS_URL}/profile/${userId}`);  // Use the userId in the request
            set({ user: response.data, isAuthenticated: true, isLoading: false });
        } catch (error) {
            console.error("Error fetchingAnotherUserData:", error);
            set({ error: 'Error fetching user data', isLoading: false });
        }
    },
}))




// Two Ways to Use set

//    With state: When you need to update based on the current state, like incrementing count by 1 based on its previous value, state is necessary. This is because set doesn’t automatically provide the current values unless you explicitly pass in (state).
//      set((state) => ({ count: state.count + 1 }))
//      Here, state.count + 1 allows you to read the current count and increment it by 1.

//    Without state: If you’re setting a value without needing to reference the current state, you don’t need (state). For instance, if you wanted to set count to a specific value, like count: 5, you can do it without (state):
//      set({ count: 5 })