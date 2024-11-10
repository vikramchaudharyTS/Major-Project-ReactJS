import express from "express";
import { checkAuth, checkMailExists, forgotPassword, login, logout, resetPassword, signup, verifyEmail } from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/userMiddleware.js";
const router = express.Router()

router.get('/check-auth', verifyToken, checkAuth)
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.post('/verify-email', verifyEmail)
router.post("/find-user-by-email", checkMailExists) 
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
export default router;