const userModel = require("../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ username });
        
        if (existingUser) {
            return res.status(409).json({ message: "User already exists. Please login." });
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            username,
            name,
            email,
            password: hash,
        });

        return res.status(201).json({ message: "Registration successful. Please login." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error. Please try again." });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.findOne({ username });

        if (!user || !bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        req.session.userId = user._id; // Store user ID in session
        return res.json({ message: "Welcome to dashboard!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error. Please try again." });
    }
});

// Logout
router.get("/logout", (req, res) => {
    if (req.session && req.session.userId) {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Failed to logout. Please try again." });
            }
            res.clearCookie('connect.sid', { path: '/' });
            return res.json({ message: "Logged out successfully." });
        });
    } else {
        return res.status(400).json({ message: "No user is logged in." });
    }
});

module.exports = router;
