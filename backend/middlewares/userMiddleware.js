const userModel = require("../models/userModel");

async function isAuth(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const user = await userModel.findById(req.session.userId)
            .populate('followers', 'username email')
            .populate('following', 'username email');
            
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = isAuth;
