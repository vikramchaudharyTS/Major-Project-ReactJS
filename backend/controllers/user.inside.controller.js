import { v2 as cloudinary } from 'cloudinary';
import notificationModel from "../models/notification.model.js";
import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';

// Get User Profile
export const getUserProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await userModel.findOne({ username }).select("-password");
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
        const { id } = req.params;
        const Id = req.userId;
        const userToModify = await userModel.findById(id);
        const currentUser = await userModel.findById(Id);

        if (id === Id) return res.status(400).json({ error: "You can't follow or unfollow yourself!" });

        if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found!" });

        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            // Unfollow the user
            await userModel.findByIdAndUpdate(id, { $pull: { followers: Id } });
            await userModel.findByIdAndUpdate(Id, { $pull: { following: id } });

            res.status(200).json({ message: "User unfollowed successfully", userId: id });

        } else {
            // Follow the user
            await userModel.findByIdAndUpdate(id, { $push: { followers: Id } });
            await userModel.findByIdAndUpdate(Id, { $push: { following: id } });

            const newNotification = new notificationModel({
                type: "follow",
                from: Id,
                to: userToModify._id
            });

            await newNotification.save();

            res.status(200).json({ message: "User followed successfully", userId: id });
        }
    } catch (error) {
        console.log("EF-B/followUnfollowUser controller" + error.message);
        res.status(500).json({ error: "error following user!" });
    }
};

// Get Suggested Users
export const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.userId;

        const userFollowedByMe = await userModel.findById(userId).select("following");

        const users = await userModel.aggregate([
            {
                $match: {
                    _id: { $ne: userId }
                }
            }, 
            { $sample: { size: 10 } }
        ]);

        const filteredUsers = users.filter(user => !userFollowedByMe.following.includes(user._id));
        const suggestedUsers = filteredUsers.slice(0, 4);

        suggestedUsers.forEach(user => user.password = null);

        res.status(200).json(suggestedUsers);

    } catch (error) {
        console.log("EF-B/getSuggestedUser controller" + error.message);
        res.status(500).json({ error: "error suggesting user!" });
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
