<<<<<<< HEAD
import {create} from 'zustand';
=======
import { create } from 'zustand';

>>>>>>> c926153dda1e39373ff5a8080aced0043432b4ec
export const usePostStore = create((set) => ({
  posts: [],
  loading: true,
  error: null,
  setPosts: (posts) => set({ posts }),
<<<<<<< HEAD
  // Add post function
  addPost: (newPost) => set((state) => ({
    posts: [...state.posts, newPost], // Add the new post to the existing posts
  })),
=======
>>>>>>> c926153dda1e39373ff5a8080aced0043432b4ec
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
