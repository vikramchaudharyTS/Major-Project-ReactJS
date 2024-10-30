const router = require("express").Router();
const isAuth = require("../middlewares/userMiddleware");
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const {dashboard} = require('../controllers/userControllers')

// Dashboard route (Authenticated)
router.get("/dashboard", isAuth, async (req, res) => {
    try {
        const user = req.user;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Fetch posts and users concurrently with pagination
        const [posts, allUsers] = await Promise.all([
            postModel.find()
                .populate('userId', 'username email')
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec(),
            userModel.find({}, 'username email')
                .exec()
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
        const user = req.user; // Get user from isAuth middleware

        // Fetch posts and userPosts concurrently
        const [posts, userPosts] = await Promise.all([
            postModel.find()
                .populate('userId', 'username email') // Only return necessary fields
                .sort({ createdAt: -1 })
                .exec(),
            postModel.find({ userId: user._id, img: { $exists: true, $ne: null } })
                .sort({ createdAt: -1 })
                .exec()
        ]);

        res.json({
            currentRoute: 'profile',
            user, // Consider limiting fields returned here for security
            posts,
            allUsers: await userModel.find(), // Fetch all users only if necessary
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

router.get('/data', isAuth, async (req,res)=>{
    try {
        const user = await userModel.findById(req.user._id)
        return res.json({user:user})
    } catch (error) {
        return res.json({message: "EF-B/data " + error.message})
    }

})

router.post("/follow/:id", async (req, res) => {
    let anotherUser = await userModel.findById(req.params.id);
    let currentUser = await userModel.findById(req.session.userId);

    if (currentUser._id.equals(anotherUser._id)) return res.send("You can't follow yourself");
    else {
        if (currentUser.following.includes(anotherUser._id)) return res.send(`You already follow ${anotherUser.username}`);
        else {
            await currentUser.updateOne({ $push: { following: anotherUser._id } });
            await anotherUser.updateOne({ $push: { followers: currentUser._id } });
            return res.redirect("/dashboard");
        }
    }
});

router.post("/unfollow/:id", async (req, res) => {
    let anotherUser = await userModel.findById(req.params.id);
    let currentUser = await userModel.findById(req.session.userId);

    if (currentUser._id.equals(anotherUser._id)) return res.send("You can't follow yourself");
    else {
        if (!currentUser.following.includes(anotherUser._id)) return res.send(`You first need to follow ${anotherUser.username}`);
        else {
            await currentUser.updateOne({ $pull: { following: anotherUser._id } });
            await anotherUser.updateOne({ $pull: { followers: currentUser._id } });
            return res.redirect("/dashboard");
        }
    }
});

router.delete("/delete/:id", async (req, res) => {
    const user = await userModel.findOneAndDelete({ _id: req.params.id });
    if (!user) {
        return res.send("No user exists or already deleted");
    }
    return res.send(`${user.username} deleted`);
});

router.get("/users", async (req, res) => {
    let user = await userModel.find();
    res.send(user);
});


module.exports = router;
