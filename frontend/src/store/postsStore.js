import { create } from "zustand";

export const usePostStore = create((set) => ({
  posts: [],
  savedPosts: {}, // Track saved status for each post
  loading: true,
  error: null,
  setPosts: (posts) => set({ posts }),
  // Add post function
  addPost: (newPost) => set((state) => ({
    posts: [...state.posts, newPost],
  })),
  // Update post function
  updatePost: (updatedPost) => set((state) => ({
    posts: state.posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    ),
  })),
  removePost: (postId) => set((state) => ({
    posts: state.posts.filter((post) => post.id !== postId),
  })),
  resetPosts: () => set({ posts: [] }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Add saved post logic
  toggleSavedPost: (postId) => set((state) => {
    const newSavedPosts = { ...state.savedPosts };
    newSavedPosts[postId] = !newSavedPosts[postId]; // Toggle the saved status
    return { savedPosts: newSavedPosts };
  }),
}));
