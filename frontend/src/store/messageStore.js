import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axios";
import { useAuthStore } from "../store/authStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isTyping: false,

  // Fetch users for chat
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Fetch messages for a specific user
  getMessages: async (userId) => {
    if (!userId) {
      toast.error("No user selected to fetch messages");
      return;
    }

    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Send a message to the selected user
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      toast.error("No user selected to send a message");
      return;
    }

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending message");
    }
  },

  // Subscribe to socket messages
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  // Unsubscribe from socket messages
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");
  },

  // Typing indicator feature
  handleTypingStatus: (isTyping) => {
    const socket = useAuthStore.getState().socket;
    const { selectedUser } = get();

    if (!selectedUser || !socket) return;

    socket.emit("typing", { userId: selectedUser._id, isTyping });
    set({ isTyping });
  },

  // Set selected user
  setSelectedUser: (selectedUser) => {
    set({ selectedUser });

    // Fetch messages for the newly selected user
    if (selectedUser) {
      get().getMessages(selectedUser._id);
    } else {
      set({ messages: [] }); // Clear messages if no user is selected
    }
  },

  // Handle user connection updates
  handleUserConnectionUpdates: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("userConnected", (userId) => {
      const updatedUsers = get().users.map((user) =>
        user._id === userId ? { ...user, isOnline: true } : user
      );
      set({ users: updatedUsers });
    });

    socket.on("userDisconnected", (userId) => {
      const updatedUsers = get().users.map((user) =>
        user._id === userId ? { ...user, isOnline: false } : user
      );
      set({ users: updatedUsers });
    });
  },

  // Cleanup on component unmount
  cleanup: () => {
    get().unsubscribeFromMessages();
  },
}));
