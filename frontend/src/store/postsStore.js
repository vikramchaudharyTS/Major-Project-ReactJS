import create from 'zustand'

export const usePostStore = create((set)=>({
    posts:[]
    setPosts:[]
}))