import express from "express";
const router = express.Router()
import { verifyToken } from "../middlewares/userMiddleware.js";
import { followUnfollowUser, getAnotherUserProfile, getNotifications, getSuggestedUsers, getUserProfile } from "../controllers/user.actions.controller.js";


router.post('/followUnfollowUser/:userId', verifyToken, followUnfollowUser);
router.get('/suggested', verifyToken, getSuggestedUsers)
router.get('/profile', verifyToken, getUserProfile)
router.get('/notifications', verifyToken, getNotifications)
router.get('/profile/:user', verifyToken, getAnotherUserProfile)


export default router;