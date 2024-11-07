//@ts-nocheck
import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("EF-B/verifyToken middleware ", error.message);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token expired" });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        res.status(500).json({ success: false, message: "Server error" });
    }
};



// const authHeader = req.headers['authorization'];
// const token = authHeader && authHeader.split(' ')[1]; // Get token from header

// Get token from cookie instead of the authorization header

// When you print decoded after verifying a JWT with jwt.verify(token, secret), it will return an object containing the payload data that was originally embedded in the JWT when it was signed.

// Find the user in the database using the info from decoded token (e.g., username)