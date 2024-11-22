import express from "express";
import { createPost, getPosts, getPostById, deletePost, likePost, savePost, getPostsFromNonFollowedUsers } from "../controllers/postControllers.js";
import { addComment, getCommentsByPost, likeComment, replyToComment } from "../controllers/postControllers.js";
import { verifyToken } from "../middlewares/userMiddleware.js";
import { upload } from "../config/s3/s3.js"; // Ensure this is the correct upload configuration

const router = express.Router();

// Post Routes
router.post("/create", verifyToken, upload, createPost); // upload will handle images first, then createPost will be called
router.get("/", verifyToken, getPosts); 
router.get("/:id", verifyToken, getPostById); 
router.get('/explorer/posts', verifyToken, getPostsFromNonFollowedUsers)
router.delete("/delete/:id", verifyToken, deletePost); 
router.put("/like/:id", verifyToken, likePost); 
router.put("/save/:id", verifyToken, savePost); 

// Comment Routes
router.post("/comments/:postId", verifyToken, addComment); 
router.get("/comments/:postId", verifyToken, getCommentsByPost); 
router.put("/comments/like/:commentId", verifyToken, likeComment); 
router.post("/comments/reply/:commentId", verifyToken, replyToComment); 

export default router;
