import dotenv, { config } from 'dotenv'
import express from 'express'
import { connectDB } from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/userRoutes.js'

dotenv.config()
const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
//Centralized error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "EF-B/CEH - Internal server error" });
});


app.use('/api/auth', authRoutes)


app.listen(3000,()=>{
    connectDB()
    console.log("Server up and running at 3000");
})