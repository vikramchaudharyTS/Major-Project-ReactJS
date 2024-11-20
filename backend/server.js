import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Import Routes
import authRoutes from './routes/userRoutes.js';
import userActions from './routes/user.action.routes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Centralized error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "EF-B/CEH - Internal server error" });
});

// Routes
app.use('/api/auth', authRoutes); // Authentication-related routes
app.use('/api/users', userActions); // User actions routes
app.use('/api/posts', postRoutes); // Posts-related routes
app.use('/api/', commentRoutes); // Comments-related routes

// Server setup
app.listen(3000, () => {
    connectDB();
    console.log("Server up and running at 3000");
});
