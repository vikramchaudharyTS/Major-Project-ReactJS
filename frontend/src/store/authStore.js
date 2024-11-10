//@ts-nocheck
import {create} from 'zustand'
import axios from 'axios'


const API_URL = 'http://localhost:3000/api/auth'

axios.defaults.withCredentials = true

export const useAuthStore = create((set)=>({

    user:null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async(email, password, name) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, { email, password, name });
            console.log("Signup response:", response);
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
            const response = await axios.post(`${API_URL}/login`, { email, password });
            // console.log("Login response:", response);  // Debugging line
            set({ user: response.data.user, isAuthenticated: true, isLoading: false, error: null });
        } catch (error) {
            console.error("EF-F/authStore Login error:", error);  // Debugging line
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }
    },
    

    logout: async()=>{
        set({isLoading: true, error: null})
        try {
            await axios.post(`${API_URL}/logout`)
            set({user:null, isAuthenticated: false, error:null  , isLoading: false})
        } catch (error) {
            console.error("EF-F/authStore Logout error:", error);  // Debugging line
            set({error:  "Error Logging you out", isLoading: false})
            throw error
        }
    },

    verifyEmail: async (code)=>{
        set({isLoading: true, error:null})
        try {
            const response = await axios.post(`${API_URL}/verify-email`, {code})
            set({user:response.data.user, isAuthenticated: true, isLoading: false})
            return response.data
        } catch (error) {
            console.error("EF-F/authStore verifyEmail error:", error);  // Debugging line
            set({error: error.response.data.message || "Verifying emial error", isLoading: false})
            throw error
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
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
			const response = await axios.post(`${API_URL}/forgot-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
            console.error("EF-F/authStore forgotPassword error:", error);  // Debugging line
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},
	resetPassword: async (token, password, confirmPassword) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, {
                newPassword: password,
                confirmNewPassword: confirmPassword
            });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            console.error("EF-F/authStore resetPassword error:", error);  // Debugging line
            set({
                isLoading: false,
                error: error.response.data.message || "Error resetting password",
            });
            throw error;
        }
    }
    
}))




// Two Ways to Use set

//    With state: When you need to update based on the current state, like incrementing count by 1 based on its previous value, state is necessary. This is because set doesn’t automatically provide the current values unless you explicitly pass in (state).
//      set((state) => ({ count: state.count + 1 }))
//      Here, state.count + 1 allows you to read the current count and increment it by 1.

//    Without state: If you’re setting a value without needing to reference the current state, you don’t need (state). For instance, if you wanted to set count to a specific value, like count: 5, you can do it without (state):
//      set({ count: 5 })