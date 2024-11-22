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
        enum: ['follow', 'like', 'like_comment', 'comment', 'reply_comment'] // Action types
    },
    modelType: { // New field for the model type used in refPath
        type: String,
        required: true,
        enum: ['Post', 'Comment', 'User'] // Valid model names
    },
    targetId: { // Dynamically resolves to 'Post' or 'Comment'
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'modelType', // Use 'modelType' for dynamic referencing
        required: true
    },
    content: {
        type: String,
        default: ''
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


const notificationModel = mongoose.model("notification", notificationSchema);

export default notificationModel;
