import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type:String,
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
    password:{
        type: String,
        // required: true,
    },
    bio:{
        type:String,
        default:""
    },
    links:{
        type:String,
        default:""
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
    profileImg:{
        type: String, 
        default: "https://vault-major-project.s3.ap-south-1.amazonaws.com/pfp.webp" 
    },
    coverImg:{
        type: String, // Store URL or path to image
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ScG9XyZvoewIebmmIIFV__8YKDRfHHC3eA&s'
    },
    savedPosts: {
        type: Array,
        default: []
    },
    blockedUsers:[{
        type: mongoose.Schema.Types.ObjectId,
        default:[]
    }],
    lastLogin:{
        type:Date,
        default: Date.now()
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, { timestamps: true });

export const userModel = mongoose.model("User", userSchema)

