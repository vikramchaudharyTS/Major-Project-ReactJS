import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        unique: true
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
    firebaseUID: { // New field for Firebase UID
        type: String,
        unique: true
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
        type: String // Store URL or path to image
    },
    coverImg:{
        type: String // Store URL or path to image
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

