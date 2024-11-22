// store.js
import { create } from 'zustand';

export const usePostStore = create((set) => ({
  posts: [],
  loading: true,
  error: null,
  setPosts: (posts) => set({ posts }),
  addPost: (newPost) => set((state) => ({ posts: [newPost, ...state.posts] })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
