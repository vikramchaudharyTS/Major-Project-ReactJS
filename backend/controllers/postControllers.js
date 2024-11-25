import { deleteImageFromS3, uploadImageToS3 } from "../config/s3/s3.js";
import { postModel, commentModel } from "../models/postModel.js";
import { userModel } from "../models/userModel.js";  // Import userModel
import notificationModel from "../models/notification.model.js";

/// --- Post Controllers ---
export const createPost = async (req, res) => {
    const userId = req.userId
    try {
        const { description, tags, isPublic, location } = req.body;
        const imageUrls = [];
        console.log("Received files:", req.files);  // Check file upload
        console.log("Received description:", req.body.description); // Check form data
        // Upload each image to S3 and collect the URLs
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const imageUrl = await uploadImageToS3(file);
                imageUrls.push(imageUrl);
            }
        }

        // Create the new post in the database
        const newPost = await postModel.create({
            userId,
            description,
            images: imageUrls,
            tags,
            isPublic,
            location,
        });

        await userModel.findByIdAndUpdate(userId, {
            $push: { myPosts: newPost._id },  // Add post ID to myPosts
        });

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const deletedPost = await postModel.findByIdAndDelete(id);
        if (!deletedPost) return res.status(404).json({ message: "Post not found" });

        // Delete images from S3 (if necessary)
        for (const image of deletedPost.images) {
            await deleteImageFromS3(image);
        }

        // Remove the deleted post ID from the user's myPosts array
        await userModel.findByIdAndUpdate(userId, {
            $pull: { myPosts: deletedPost._id },  // Remove post ID from myPosts
        });

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// fetch posts created by logged-in user only
export const getPostsForProfileBlock = async (req, res) => {
    try {
        const userId = req.userId; // Extract user ID from request
        // const { page = 1, limit = 10 } = req.query; // Default values for pagination

        // Fetch posts created by the logged-in user
        const posts = await postModel
            .find({ userId }) // Filter posts by the logged-in user's ID
            .populate("userId", "username name profileImg") // Populate user info
            .select("userId description images createdAt location tags") // Only retrieve required post fields
            .sort({ createdAt: -1 }) // Sort by newest posts first
        // .skip((page - 1) * limit) // Pagination logic
        // .limit(parseInt(limit)); // Limit number of posts per page

        if (!posts.length) {
            return res.status(404).json({ message: "You have no posts yet!" });
        }

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// fetch posts created by logged-in user and users they follow
export const getPostForFeed = async (req, res) => {
    try {
        // Assuming the user's ID is available in req.user from the verifyToken middleware
        const userId = req.userId;

        // Fetch the logged-in user's data to get the list of people they follow
        const user = await userModel.findById(userId).populate('following', '_id');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract the list of followed users' IDs
        const followedUserIds = user.following.map(followedUser => followedUser._id);

        // Include the logged-in user's ID in the query to fetch their posts as well
        followedUserIds.push(userId); // Add the logged-in user to the list of followed users

        // Fetch posts of the logged-in user and the users they follow
        const posts = await postModel
            .find({ userId: { $in: followedUserIds } })
            .populate("userId", "username name profileImg");

        if (!posts.length) {
            return res.status(404).json({ message: "No posts found for this user and their follows" });
        }

        // Optionally, format the data if needed
        const formattedPosts = posts.map((post) => ({
            id: post._id,
            userId: post.userId,
            description: post.description,
            images: post.images,
            likes: post.likes.length,
            comments: post.comments,
            createdAt: post.createdAt,
        }));

        res.status(200).json(formattedPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get posts from all users except the ones the logged-in user follows and their own posts
export const getPostsFromNonFollowedUsers = async (req, res) => {
    try {
        const userId = req.userId; // Extract logged-in user's ID from the request
        // Fetch the logged-in user's data to get their list of followings
        const user = await userModel.findById(userId).populate('following', '_id');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract the list of followed user IDs
        const followedUserIds = user.following.map(followedUser => followedUser._id.toString());
        // Add the logged-in user's ID to exclude their own posts
        followedUserIds.push(userId);

        // Fetch posts excluding the logged-in user and their followings
        const remainingPosts = await postModel
            .find({
                userId: { $nin: followedUserIds }, // Exclude posts by followed users and self
            })
            .populate("userId", "username name profileImg") // Populate user details
            .select("userId description images createdAt location tags") // Select relevant fields
            .sort({ createdAt: -1 }); // Sort by newest posts

        if (remainingPosts.length === 0) {
            return res.status(404).json({ message: "No posts found from non-followed users" });
        }

        res.status(200).json(remainingPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};




export const likePost = async (req, res) => {
    try {
        const { id } = req.params; // Post ID
        const userId = req.userId; // ID of the logged-in user

        const post = await postModel.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const isLiked = post.likes.includes(userId);
        if (isLiked) {
            // Unlike the post
            post.likes = post.likes.filter((id) => id.toString() !== userId);
        } else {
            // Like the post
            post.likes.push(userId);

            // Add notification
            const newNotification = new notificationModel({
                type: "like",
                from: userId,
                to: post.userId,
                modelType: "Post", // Specify the model type
                targetId: post._id,
            });
            await newNotification.save();
        }

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const savePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const post = await postModel.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const isSaved = post.savedBy.includes(userId);
        if (isSaved) {
            post.savedBy = post.savedBy.filter((id) => id.toString() !== userId);
        } else {
            post.savedBy.push(userId);
        }

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/// --- Comment Controllers ---
export const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { commentText } = req.body;
        const userId = req.userId

        const newComment = await commentModel.create({ postId, userId, commentText });
        const post = await postModel.findById(postId);

        if (!post) return res.status(404).json({ message: "Post not found" });

        post.comments.push(newComment._id);
        await post.save();

        // Add notification
        const newNotification = new notificationModel({
            type: "comment",
            from: userId,
            modelType: "Comment",
            to: post.userId,
            targetId: newComment._id,
            content: commentText,
        });
        await newNotification.save();

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await commentModel.find({ postId }).populate("userId", "username profileImg");
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const likeComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.userId

        const comment = await commentModel.findById(commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        const isLiked = comment.likes.includes(userId);
        if (isLiked) {
            comment.likes = comment.likes.filter((id) => id.toString() !== userId);
        } else {
            comment.likes.push(userId);
            // Add notification
            const newNotification = new notificationModel({
                type: "like_comment",
                from: userId,
                modelType:"Comment",
                to: comment.userId._id,
                targetId: comment._id,
            });
            await newNotification.save();
        }

        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const replyToComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { replyText } = req.body;
        const userId = req.userId

        const comment = await commentModel.findById(commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        const newReply = {
            userId,
            replyText,
            createdAt: new Date(),
        };

        comment.replies.push(newReply);
        await comment.save();

        const newNotification = new notificationModel({
            type: "reply_comment",
            from: userId,
            modelType:"Comment",
            to: comment.userId._id,
            targetId: comment._id,
            content: replyText,
        });
        await newNotification.save();

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
