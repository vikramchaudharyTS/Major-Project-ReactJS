const userModel = require("../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuth = require("../middlewares/userMiddleware");
const admin = require("../firebase/firebase-admin");

// Register
router.post("/register", async (req, res) => {
    const { name, username, email, password, firebaseUID } = req.body;
    try {
        // Regular email-password registration requires a password
        if (!firebaseUID && !password) {
            return res.status(400).json({ message: "Password is required for email registration" });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await userModel.findOne({ 
            $or: [
                { username }, 
                { email: { $regex: new RegExp(`^${email}$`, 'i') } }
            ]
        });

        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ error: "Username is already taken!" });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ error: "Email already exists!" });
            }
        }

        // Hash the password if it's provided (skip for Google sign-ups)
        let hashedPassword = undefined;
        if (password) {
            console.log("Password received for hashing:", password);
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const newUser = new userModel({
            name,
            username,
            email,
            firebaseUID,
            password: hashedPassword, // Will be undefined for Google sign-ups
        });

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            followers: newUser.followers,
            following: newUser.following,
            profileImg: newUser.profileImg,
            coverImg: newUser.coverImg,
        });
    } catch (error) {
        console.error("EF-B/Register", error.message);
        return res.status(500).json({ From: "Backend", message: "An error occurred during registration" });
    }
});

// login    
router.post("/login", async (req, res) => {
    const { username, password, idToken } = req.body;
  
    try {
      if (idToken) {
        // Google login logic
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, email, name } = decodedToken;
  
        let user = await userModel.findOne({ firebaseUID: uid });
        if (!user) {
          user = new userModel({
            firebaseUID: uid,
            name: name || "New User",
            email: email || "",
            username: email.split("@")[0],
          });
          await user.save();
        }
  
        const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN, { expiresIn: "1h" });
        res.cookie("jwt", token, { httpOnly: true, secure: false, maxAge: 3600000, sameSite: "None" });
        return res.json({ message: "Welcome to the dashboard!" });
      } else if (username && password) {
        // Regular login logic
        const user = await userModel.findOne({ username });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });
  
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });
  
        const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN, { expiresIn: "1h" });
        res.cookie("jwt", token, { httpOnly: true, secure: false, maxAge: 3600000, sameSite: "None" });
        return res.json({ message: "Welcome to the dashboard!" });
      } else {
        return res.status(400).json({ message: "Missing credentials" });
      }
    } catch (error) {
      console.error("EF-B/Login", error.message);
      return res.status(500).json({ message: error.message });
    }
  });
  

// Logout
router.get("/logout", isAuth, async (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({ message: "Logout successful!" });
    } catch (error) {
        console.error("EF-B/Logout", error.message);
        return res.status(500).json({ From: "Backend", message: error.message });
    }
});

module.exports = router;
