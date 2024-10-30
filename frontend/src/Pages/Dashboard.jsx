//@ts-nocheck
import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { LuArrowLeftFromLine } from "react-icons/lu";
import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import Notifications from '../components/Notifications';
import ExtremeRightBar from '../components/ExtremeRightBar';
import instance from '../utils/axios';
import { Context } from '../contexts/Context';
import useSWR from 'swr'


// const fetcher = async (url, token) => {
//     const response = await instance.get(url, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });
//     return response.data;  // return the response data from the API
// };

function Dashboard() {
    const {user,setUser} = useContext(Context)
    // const {data, error} = useSWR("http://localhost:3000/data", fetcher)
    const getUser = async ()=>{
        try {
            const response = await instance.get('/dashboard')
            // setUser(response.data.user)
            console.log(response.data.user);
        } catch (error) {
            console.log("Frontend error " + error.message);
        }
    }

    useEffect(()=>{
        getUser()
    },[])

    // if(error) return <h1>{error.message}</h1>
    // if(!data) return <h1>Loading...</h1>

    // console.log(data);
    
  return (
    <>
       
        <div className='flex items-center justify-between'>
           
            <div className='w-[13%] h-screen backdrop-blur-sm'>
                <Sidebar />
            </div>

            <div className='flex flex-col w-[87%]'>
                <div>
                    <Navbar />
                </div>

                <div className='flex'>
                    <div className='mx-10 w-[49%] h-screen flex flex-col items-center overflow-scroll'>
                        <Feed/>
                    </div>
                    <div className='w-[20%]  mr-10'>
                        <Notifications />
                    </div>
                    <div className='w-[23%] h-screen'>
                        <ExtremeRightBar />
                    </div>
                </div>
            </div>

            
        </div>
        
        


    </>
    
  )
}

export default Dashboard