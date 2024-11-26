import notificationModel from "../models/notification.model.js";
import { userModel } from "../models/userModel.js";
import { formatNotificationMessage } from '../utils/formatNotificationMessages.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
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
                await deleteImageFromS3(user.profileImg); // Delete previous profile image from S3
            }
            const uploadedProfileImg = await uploadImageToS3(profileImg); // Upload new profile image to S3
            profileImg = uploadedProfileImg;
        }

        if (coverImg) {
            if (user.coverImg) {
                await deleteImageFromS3(user.coverImg); // Delete previous cover image from S3
            }
            const uploadedCoverImg = await uploadImageToS3(coverImg); // Upload new cover image to S3
            coverImg = uploadedCoverImg;
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

export const getUserProfile = async (req, res) => {
    const userId = req.userId;

    try {
        const user = await userModel.findById(userId)
        .select("-password")
        .populate({
            path: 'myPosts',
            options: {
                sort: { createdAt: -1 }
            }
        })
        .exec();

        if (!user) {
            return res.status(404).json({ error: "No user found!" });
        }

        res.status(200).json({ user, posts: user.myPosts });
    } catch (error) {
        console.log("EF-B/getUserProfile controller" + error.message);
        res.status(500).json({ error: "Error getting user details!" });
    }
};

export const getAnotherUserProfile = async (req, res) => {
    const { user: userId } = req.params;

    try {
        const user = await userModel.findById(userId)
        .select("-password")
        .populate({
            path: 'myPosts',
            options: {
                sort: { createdAt: -1 }
            }
        })
        .exec();

        if (!user) {
            return res.status(404).json({ error: "No user found!" });
        }

        res.status(200).json({ user, posts: user.myPosts });
    } catch (error) {
        console.log("EF-B/getAnotherUserProfile controller" + error.message);
        res.status(500).json({ error: "Error getting user details!" });
    }
};

export const followUnfollowUser = async (req, res) => {
    try {
        const { userId } = req.params;  
        const Id = req.userId;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(Id)) {
            return res.status(400).json({ error: "Invalid user ID!" });
        }

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
            await userModel.findByIdAndUpdate(userId, { $pull: { followers: Id } });
            await userModel.findByIdAndUpdate(Id, { $pull: { following: userId } });

            res.status(200).json({ message: "User unfollowed successfully", userId });
        } else {
            await userModel.findByIdAndUpdate(userId, { $push: { followers: Id } });
            await userModel.findByIdAndUpdate(Id, { $push: { following: userId } });

            const newNotification = new notificationModel({
                type: "follow",
                from: Id,
                to: userToModify._id,
                targetId: userToModify._id,
                modelType: "User"
            });

            await newNotification.save();

            res.status(200).json({ message: "User followed successfully", userId });
        }
    } catch (error) {
        console.log("EF-B/followUnfollowUser controller: " + error.message);
        res.status(500).json({ error: "Error following/unfollowing user: " + error.message });
    }
};

export const getSuggestedUsers = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userId); 

        const userFollowedByMe = await userModel.findById(userId).select("following");

        const users = await userModel.aggregate([
            {
                $match: {
                    _id: { $ne: userId, $nin: userFollowedByMe.following }
                }
            },
            { $sample: { size: 10 } }, 
            { $project: { password: 0 } }
        ]);

        const suggestedUsers = users.slice(0, 4);

        res.status(200).json(suggestedUsers);
    } catch (error) {
        console.log("EF-B/getSuggestedUser controller: " + error.message);
        res.status(500).json({ error: "Error suggesting user!" });
    }
};
export const getNotifications = async (req, res) => {
    const userId = req.userId; // Assuming userId is retrieved from middleware
    const { page = 1 } = req.query; // Default page is 1

    try {
        const limit = 15;
        const skip = (page - 1) * limit;

        // Fetch notifications for the logged-in user, excluding notifications from the user themselves
        const notifications = await notificationModel
            .find({ to: userId, from: { $ne: userId } }) // Exclude self-generated notifications
            .populate("from", "username profileImg") // Populate sender info
            .populate("targetId", "description images commentText") // Populate target details (Post or Comment)
            .sort({ createdAt: -1 }) // Sort by newest first
            .skip(skip)
            .limit(limit);

        // Format notifications with dynamic messages
        const formattedNotifications = notifications.map((notification) => ({
            id: notification._id,
            from: notification.from, // Includes populated "username" and "profileImg"
            message: formatNotificationMessage(notification), // Generate message dynamically
            read: notification.read,
            createdAt: notification.createdAt,
        }));

        res.status(200).json(formattedNotifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
