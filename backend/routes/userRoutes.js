const router = require("express").Router();
const isAuth = require("../middlewares/userMiddleware");
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

// Register and Login routes (simple responses)
router.get("/register", (req, res) => {
    res.json({ message: "Register page data" });
});

router.get("/login", (req, res) => {
    res.json({ message: "Login page data" });
});

router.get("/feed", (req, res) => {
    res.json({ message: "Feed page data" });
});

// Dashboard route (Authenticated)
router.get("/dashboard", isAuth, async (req, res) => {
    try {
        const user = req.user;

        // Fetch posts and users concurrently
        const [posts, allUsers] = await Promise.all([
            postModel.find().populate('userId', 'username email').sort({ createdAt: -1 }).exec(),
            userModel.find().exec()
        ]);

        res.json({
            currentRoute: 'dashboard',
            user,
            posts,
            allUsers,
            following: user.following
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

// Profile route (Authenticated)
router.get("/profile", isAuth, async (req, res) => {
    try {
        const user = req.user;

        // Fetch posts and userPosts concurrently
        const [posts, userPosts] = await Promise.all([
            postModel.find().populate('userId', 'username email').sort({ createdAt: -1 }).exec(),
            postModel.find({ userId: user._id, img: { $exists: true, $ne: null } }).sort({ createdAt: -1 }).exec()
        ]);

        res.json({
            currentRoute: 'profile',
            user,
            posts,
            allUsers: await userModel.find(), // Fetch only if necessary
            following: user.following,
            userPosts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

// Posts route (Authenticated, returns data for post popup)
router.get("/posts", isAuth, (req, res) => {
    const createPost = req.query.createPost === 'true'; // Check if createPost is true
    res.json({ showPostPopup: createPost });
});

// Settings route (Authenticated)
router.get("/settings", isAuth, async (req, res) => {
    try {
        const user = req.user;
        res.json({
            currentRoute: 'settings',
            user,
            following: user.following
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

// Notifications route (Authenticated)
router.get("/notifications", isAuth, async (req, res) => {
    try {
        const user = req.user;

        // Fetch posts and all users concurrently
        const [posts, allUsers] = await Promise.all([
            postModel.find().exec(),
            userModel.find().exec()
        ]);

        res.json({
            currentRoute: 'notifications',
            user,
            allUsers,
            posts,
            following: user.following
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

// Messages route (Authenticated)
router.get("/messages", isAuth, (req, res) => {
    res.json({ message: "Messages page data" });
});

module.exports = router;
