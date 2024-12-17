import mongoose, { mongo } from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        sparse: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    bio: {
        type: String,
        default: ""
    },
    links: {
        type: String,
        default: ""
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    myPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    profileImg: {
        type: String, 
        default: "https://vault-major-project.s3.ap-south-1.amazonaws.com/profilePFPpng.png" 
    },
    coverImg: {
        type: String, 
        default: 'https://vault-major-project.s3.ap-south-1.amazonaws.com/coverPFPjpg.jpg'
    },
    savedPosts: {
        type: Array,
        default: []
    },
    blockedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        default: []
    }],
    lastLogin: {
        type: Date,
        default: Date.now()
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: [{
        token: String,
        expiresAt: Date
    }],
}, { timestamps: true });

export const userModel = mongoose.model("User", userSchema);
