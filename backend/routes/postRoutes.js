import express from "express";
import { createPost, deletePost, likePost, savePost, getPostsFromNonFollowedUsers, getPostsForProfileBlock, getPostForFeed } from "../controllers/postControllers.js";
import { addComment, getCommentsByPost, likeComment, replyToComment } from "../controllers/postControllers.js";
import { verifyToken } from "../middlewares/userMiddleware.js";
import { upload } from "../config/s3/s3.js"; // Ensure this is the correct upload configuration

const router = express.Router();

// Post Routes
router.post("/create", verifyToken, upload, createPost);
router.get("/user-profile", verifyToken, getPostsForProfileBlock); 
router.get('/explorer/posts', verifyToken, getPostsFromNonFollowedUsers)
router.get("/:id", verifyToken, getPostForFeed); 
router.delete("/delete/:id", verifyToken, deletePost); 
router.put("/like/:id", verifyToken, likePost); 
router.put("/save/:id", verifyToken, savePost); 

// Comment Routes
router.post("/:postId", verifyToken, addComment); 
router.get("/:postId", verifyToken, getCommentsByPost); 
router.put("/like/:commentId", verifyToken, likeComment); 
router.post("/reply/:commentId", verifyToken, replyToComment); 

export default router;
