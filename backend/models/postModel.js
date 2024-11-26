import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    images: [
        {
            type: String, // URLs or paths to images
            validate: {
                validator: function (v) {
                    return /^https?:\/\/.*\.(jpeg|jpg|png|gif|webp|svg)$/.test(v); // Basic URL validation
                },
                message: props => `${props.value} is not a valid image URL!`
            }
        }
    ],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    tags: [{
        type: String
    }],
    savedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isPublic: {
        type: Boolean,
        default: true
    },
    location: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const commentSchema = new mongoose.Schema({
    postId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    commentText: { 
        type: String, 
        required: true 
    },
    likes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    replies: [
        {
            userId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User', 
                required: true 
            },
            replyText: { 
                type: String, 
                required: true 
            },
            likes: [{ 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User' 
            }],
            createdAt: { 
                type: Date, 
                default: Date.now 
            },
            isPublic: { 
                type: Boolean, 
                default: true 
            }
        }
    ],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

export const commentModel = mongoose.model("Comment", commentSchema);
export const postModel = mongoose.model("Post", postSchema);
