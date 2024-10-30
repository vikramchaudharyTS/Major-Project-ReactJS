const userModel = require("../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const isAuth = require("../middlewares/userMiddleware");

// Register
router.post("/register", async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        const {name, username, email, password} = req.body;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ error: "Username is already taken!" });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ error: "Email already exists!" });
            }
        }
        const hashedPassword = await bcrypt.hashSync(password, 10)
        const newUser = new userModel({
            name,
            username,
            email,
            password: hashedPassword
        })

        // Save the new user to the database
        await newUser.save();

        // Respond with user data
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            followers: newUser.followers,
            following: newUser.following,
            profileImg: newUser.profileImg,
            coverImg: newUser.coverImg
        });
      
    } catch (error) {
        console.error("EF-B/Register", error.message);
        return res.status(500).json({ From: "Backend", message: "An error occurred during registration" });
    }
});



// Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username }).select("username password");

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000,
            sameSite: 'None'
        })
        return res.json({ message: "Welcome to dashboard!" });
    } catch (error) {
        console.error("EF-B/Login", error.message);
        return res.status(500).json({ From: "Backend", message: error.message });
    }
});



// Logout
router.get("/logout", isAuth,async (req, res) => {
    try {
        res.clearCookie('jwt')
        return res.status(200).json({ message: "Logout successful!" });
    } catch (error) {
        console.error("EF-B/Logout", error.message);
        return res.status(500).json({ From: "Backend", message: error.message });
    }
});


module.exports = router;


