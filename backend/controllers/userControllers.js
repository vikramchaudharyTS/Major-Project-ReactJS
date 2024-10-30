
// Dashboard controller
const dashboard = async (req, res) => {
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
};

