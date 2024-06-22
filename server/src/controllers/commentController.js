const Comment = require('../models/commentSchema');
const User = require('../models/userSchema');
const Post = require('../models/postSchema');

exports.addComment = async (req, res) => {
    try {
        const { content, user, postId } = req.body;

        const checkUser = await User.findOne({ username: user });
        if (!checkUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (!checkUser.comments) {
            checkUser.comments = [];
        }

        if (!post.comments) {
            post.comments = [];
        }

        const newComment = new Comment({
            content,
            user: checkUser._id,
            post: postId
        });

        await newComment.save();

        checkUser.comments.push(newComment._id);
        await checkUser.save();

        post.comments.push(newComment._id);
        await post.save();

        res.status(200).json({ message: 'Comment added successfully', newComment });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};