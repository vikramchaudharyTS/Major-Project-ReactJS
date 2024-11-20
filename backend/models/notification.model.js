import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['follow', 'like', 'like_comment', 'comment', 'reply_comment'] // New actions added
    },
    targetId: { // New field to represent the post or comment related to the notification
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'type', // This will dynamically point to either 'Post' or 'Comment'
        required: true
    },
    content: { // Optional: A short description or excerpt related to the notification (e.g., comment text)
        type: String,
        default: ''
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const notificationModel = mongoose.model("notifications", notificationSchema);

export default notificationModel;
