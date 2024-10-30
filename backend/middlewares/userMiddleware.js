const jwt = require('jsonwebtoken');
const userModel = require("../models/userModel");

async function isAuth(req, res, next) {
    const token = req.cookies.jwt;
    console.log("Token received:", token); // Log the token

    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: "Unauthorized. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        console.log("Decoded token:", decoded); // Log the decoded token

        const user = await userModel.findOne({ username: decoded.username });
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user; // Attach user info to the request object
        next();
        
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(403).json({ message: "Invalid or expired token." });
    }
}

module.exports = isAuth;


// const authHeader = req.headers['authorization'];
// const token = authHeader && authHeader.split(' ')[1]; // Get token from header

// Get token from cookie instead of the authorization header

// When you print decoded after verifying a JWT with jwt.verify(token, secret), it will return an object containing the payload data that was originally embedded in the JWT when it was signed.

// Find the user in the database using the info from decoded token (e.g., username)