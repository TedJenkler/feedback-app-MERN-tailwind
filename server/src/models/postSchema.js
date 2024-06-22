const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    category: { 
        type: Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    date: {
        type: Date,
        default: Date.now
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;