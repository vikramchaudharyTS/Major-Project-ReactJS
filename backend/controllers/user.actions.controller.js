import { v2 as cloudinary } from 'cloudinary';
import notificationModel from "../models/notification.model.js";
import {userModel} from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// Get User Profile
export const getUserProfile = async (req, res) => {
    const userId = req.userId;

    try {
        const user = await userModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "No user found!" });
        }
        res.status(200).json(user);

    } catch (error) {
        console.log("EF-B/getUserProfile controller" + error.message);
        res.status(500).json({ error: "error getting user details!" });
    }
};

export const getAnotherUserProfile = async (req, res) => {
    const { user: userId } = req.params;
    
    try {
        const user = await userModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "No user found!" });
        }
        res.status(200).json(user);

    } catch (error) {
        console.log("EF-B/getUserProfile controller" + error.message);
        res.status(500).json({ error: "error getting user details!" });
    }
};

// Follow or Unfollow User
export const followUnfollowUser = async (req, res) => {
    try {
        const { userId } = req.params;  // Access the correct route parameter
        const Id = req.userId;

        // Validate IDs as ObjectId instances
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(Id)) {
            return res.status(400).json({ error: "Invalid user ID!" });
        }

        // Prevent the user from following themselves
        if (userId === Id) {
            return res.status(400).json({ error: "You cannot follow yourself!" });
        }

        const userToModify = await userModel.findById(new mongoose.Types.ObjectId(userId));
        const currentUser = await userModel.findById(new mongoose.Types.ObjectId(Id));

        if (!userToModify || !currentUser) {
            return res.status(400).json({ error: "User not found!" });
        }

        const isFollowing = currentUser.following.includes(userId);

        if (isFollowing) {
            // Unfollow the user
            await userModel.findByIdAndUpdate(userId, { $pull: { followers: Id } });
            await userModel.findByIdAndUpdate(Id, { $pull: { following: userId } });

            res.status(200).json({ message: "User unfollowed successfully", userId });
        } else {
            // Follow the user
            await userModel.findByIdAndUpdate(userId, { $push: { followers: Id } });
            await userModel.findByIdAndUpdate(Id, { $push: { following: userId } });

            const newNotification = new notificationModel({
                type: "follow",
                from: Id,
                to: userToModify._id
            });

            await newNotification.save();

            res.status(200).json({ message: "User followed successfully", userId });
        }
    } catch (error) {
        console.log("EF-B/followUnfollowUser controller: " + error.message);
        res.status(500).json({ error: "Error following/unfollowing user: " + error.message });
    }
};

// Get Suggested Users
export const getSuggestedUsers = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userId); // Convert to ObjectId

        // Retrieve the following list for the current user
        const userFollowedByMe = await userModel.findById(userId).select("following");

        // Suggested users excluding the current user and already followed users
        const users = await userModel.aggregate([
            {
                $match: {
                    _id: { $ne: userId, $nin: userFollowedByMe.following } // Exclude current user and followed users
                }
            },
            { $sample: { size: 10 } }, // Randomly sample 10 users
            { $project: { password: 0 } } // Exclude the password field
        ]);

        // Limit to 4 users for suggestions
        const suggestedUsers = users.slice(0, 4);

        res.status(200).json(suggestedUsers);
    } catch (error) {
        console.log("EF-B/getSuggestedUser controller: " + error.message);
        res.status(500).json({ error: "Error suggesting user!" });
    }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
    const { name, email, username, link, bio } = req.body;
    let { profileImg, coverImg } = req.body;
    const userId = req.userId;

    try {
        let user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found!" });

        if (profileImg) {
            if (user.profileImg) {
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
            }
            const uploadedProfileImg = await cloudinary.uploader.upload(profileImg);
            profileImg = uploadedProfileImg.secure_url;
        }

        if (coverImg) {
            if (user.coverImg) {
                await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
            }
            const uploadedCoverImg = await cloudinary.uploader.upload(coverImg);
            coverImg = uploadedCoverImg.secure_url;
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.links = link || user.links;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;

        user = await user.save();
        user.password = null;

        return res.status(200).json(user);

    } catch (error) {
        console.log("EF-B/updateUserProfile controller" + error.message);
        res.status(500).json({ error: "error updating user profile!" });
    }
};
