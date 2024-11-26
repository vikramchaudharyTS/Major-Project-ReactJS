import {create} from 'zustand';
export const usePostStore = create((set) => ({
  posts: [],
  loading: true,
  error: null,
  setPosts: (posts) => set({ posts }),
  // Add post function
  addPost: (newPost) => set((state) => ({
    posts: [...state.posts, newPost], // Add the new post to the existing posts
  })),
  // Update post function
  updatePost: (updatedPost) => set((state) => ({
    posts: state.posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    ), // Update the specific post
  })),
  removePost: (postId) => set((state) => ({
    posts: state.posts.filter((post) => post.id !== postId), // Filter out the deleted post
  })),
  resetPosts: () => set({ posts: [] }), // Reset posts state
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
