import { userModel } from "../models/userModel.js";
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { resetPasswordSuccessEmail, sendPasswordResetEmail, sendVerificationEmail, sendWelcomeEmail } from "../config/nodemailer/email.js";


export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        if (!email || !password || !name) {
            throw new Error("All fields required");
        }

        // Check if the user already exists
        let userAlreadyExists = await userModel.findOne({ email });

        if (userAlreadyExists) {
            // if user already exists then generate a new verification token
            const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

            // push that token in the verification token array
            userAlreadyExists.verificationToken.push({
                token: verificationToken,
                expiresAt: Date.now() + 60 * 60 * 1000  // 1-hour expiration
            });

            await userAlreadyExists.save();

            // send the new token via email
            await sendVerificationEmail(userAlreadyExists.email, verificationToken);

            return res.status(200).json({
                success: true,
                message: "A new verification code has been sent to your email."
            });
        }

        // if user doesn't exist just create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Generate a random verification token
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 60 * 60 * 1000; // TTL - 1 hour expiration time

        // this will generate a random username
        const username = req.body.username || `${name.toLowerCase().replace(/\s+/g, '')}${Math.floor(Math.random() * 10000)}`;

        const newUser = new userModel({
            email,
            password: hashedPassword,
            name,
            username,  
            verificationToken: [{ token: verificationToken, expiresAt }],
        });

        await newUser.save();

        // JWT token and email verification
        generateTokenAndSetCookie(res, newUser._id);
        await sendVerificationEmail(newUser.email, verificationToken);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...newUser._doc,
                password: null
            }
        });

    } catch (error) {
        console.log("EF-B/signup ", error.message);
        res.status(400).json({ success: false, message: "EF-B/signup " + error.message });
    }
};


export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await userModel.findOne({
            verificationToken: {
                $elemMatch: {
                    token: code,
                    expiresAt: { $gt: Date.now() } // checking if the token is still valid
                }
            }
        });

        if (!user) return res.status(400).json({ success: false, message: "Invalid or expired verification code" });

        // searching the token through the token array
        const tokenIndex = user.verificationToken.findIndex(t => t.token === code);
        
        // if token exists mark user as verified and remove all tokens
        if (tokenIndex !== -1) {
            user.isVerified = true;
            user.verificationToken = []; // Remove all the tokens from the array
            await user.save();

            await sendWelcomeEmail(user.email, user.name);

            res.status(200).json({
                success: true,
                message: "Email verified successfully",
                user: { ...user._doc, password: undefined }
            });
        } else {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }

    } catch (error) {
        console.log("EF-B/verifyEmail ", error.message);
        res.status(400).json({ success: false, message: "EF-B/verifyEmail " + error.message });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })

        if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" })
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) return res.status(400).json({ success: false, message: "Invalid credentials" })

        if (!user.isVerified) return res.status(400).json({ success: false, message: "Please verify your email first!" })

        generateTokenAndSetCookie(res, user._id)
        user.lastLogin = new Date()
        await user.save()

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                ...user._doc,
                password: null
            }
        })

    } catch (error) {
        console.log("EF-B/login ", error.message);
        res.status(400).json({ success: false, message: "EF-B/login " + error.message })
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userModel.findOne({ email })
        if (!user) return res.status(400).json({ success: false, message: "user not found" })

        //generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt = Date.now() + 10 * 60 * 1000 // 10 minutes

        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpiresAt

        await user.save()

        //send email
        await sendPasswordResetEmail(user.email, `http:localhost:5173/reset-password/${resetToken}`)

        res.status(200).json({
            success: true,
            message: "Password reset email sent. Please check your email."
        });

    } catch (error) {
        console.log("EF-B/password-reset ", error.message);
        res.status(400).json({ success: false, message: "EF-B/password-reset " + error.message })
    }
}

// Check if the email exists in the database
export const checkMailExists = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error checking email" });
    }
};


export const resetPassword = async (req, res) => {
    const { newPassword, confirmNewPassword } = req.body;
    const resetToken = req.params.token;

    try {
        // Find user by reset token and check token expiration
        const user = await userModel.findOne({
            resetPasswordToken: resetToken,
            resetPasswordExpiresAt: { $gt: Date.now() },
        });

        if (!user) return res.status(400).json({ success: false, message: "Invalid or expired token." });

        // Check if new passwords match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ success: false, message: "New password and confirmation password do not match." });
        }

        // Hash new password and update it
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        //send reset password successfull mail
        await resetPasswordSuccessEmail(user.email)

        res.status(200).json({
            success: true,
            message: "Password reset successful.",
        });

    } catch (error) {
        console.error("Error in resetPassword:", error.message);
        res.status(500).json({ success: false, message: "Server error" + error.message });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,           // Secure cookies only accessible by the server
        secure: "production", // Set secure flag only in production (for HTTPS)
        sameSite: "None",         // Allows cross-site requests (important for third-party contexts)
    });
    res.status(200).send("Logged out successfully.");
};

export const checkAuth = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select("-password")
        if (!user) return res.status(400).json({ success: false, message: "user not found" })

        return res.status(200).json({ success: true, user })

    } catch (error) {
        console.error("EF-B/CheckAuth ", error.message);
        res.status(500).json({ success: false, message: "EF-B/CheckAuth " + error.message });
    }
}

export const allUsers = async (req, res) => {
    try {
        const users = await userModel.find({}); // Fetch all users

        if (users.length > 0) {
            const formattedUsers = users.map(user => ({
                userId: user._id,
                username: user.username
            }));

            return res.status(200).json(formattedUsers); // Return formatted users
        } else {
            return res.status(404).json({ message: "No users found" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
