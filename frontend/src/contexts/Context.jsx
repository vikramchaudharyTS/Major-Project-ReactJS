import { createContext, useState } from "react";

export const Context = createContext()

const ActiveContext = ({children})=>{

    //messaging user context
    const users = [
        {
          name: "Vikram",
          img: "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFsZXxlbnwwfHwwfHx8MA%3D%3D",
          message: "Hello! I'm excited to connect with you."
        },
        {
          name: "John",
          img: "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
          message: "Just finished reading a great book!"
        },
        {
          name: "Scott",
          img: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D",
          message: "Can't wait for the weekend!"
        },
        {
          name: "Michael",
          img: "https://images.unsplash.com/photo-1507081323647-4d250478b919?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
          message: "Let’s grab coffee sometime."
        },
        {
          name: "Alice",
          img: "https://images.unsplash.com/photo-1492288991661-058aa541ff43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8",
          message: "I'm loving the new season of my favorite show!"
        },
        {
          name: "Eve",
          img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          message: "Looking for recommendations on good movies."
        },
        {
          name: "Bob",
          img: "https://images.unsplash.com/photo-1498798821241-1f327af804fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
          message: "Just got back from an amazing trip!"
        },
        {
          name: "Charlie",
          img: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8",
          message: "I’m learning how to play guitar!"
        },
        {
          name: "Dave",
          img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8",
          message: "Can’t believe it’s already October!"
        },
        {
          name: "Grace",
          img: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          message: "I love experimenting with new recipes!"
        },
        {
          name: "Henry",
          img: "https://images.unsplash.com/photo-1482849737880-498de71dda8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIxfHx8ZW58MHx8fHx8",
          message: "Just got a new puppy! Can't wait to show you!"
        },
        {
          name: "Isabella",
          img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
          message: "I'm on a journey to get fit. Join me!"
        },
        {
          name: "Jack",
          img: "https://images.unsplash.com/photo-1599834562135-b6fc90e642ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIyfHx8ZW58MHx8fHx8",
          message: "Excited for the upcoming concert!"
        },
        {
          name: "Liam",
          img: "https://images.unsplash.com/photo-1561688961-7588856fe6ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI1fHx8ZW58MHx8fHx8",
          message: "Can't wait for the holidays!"
        },
        {
          name: "Mia",
          img: "https://plus.unsplash.com/premium_photo-1661768742069-4de270a8d9fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmVtYWxlfGVufDB8fDB8fHww",
          message: "Just completed my first marathon!"
        },
        {
          name: "Noah",
          img: "https://images.unsplash.com/photo-1611403119860-57c4937ef987?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI3fHx8ZW58MHx8fHx8",
          message: "Just got a promotion at work!"
        },
        {
          name: "Olivia",
          img: "https://plus.unsplash.com/premium_photo-1667667720322-4f46f850d5c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZlbWFsZXxlbnwwfHwwfHx8MA%3D%3D",
          message: "Learning about digital marketing this month."
        },
    
    ]

    return (
        <>
            <Context.Provider value={{users}}>
                {children}
            </Context.Provider>
        </>
    )
}

export default ActiveContext;