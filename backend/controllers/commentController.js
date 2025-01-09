const Comment = require('../models/commentSchema');
const User = require('../models/userSchema');
const Post = require('../models/postSchema');

exports.getAll = async (req, res) => {
  try {
    const comments = await Comment.find();
    if (comments.length === 0) {
      return res.status(404).json({ message: 'Comments not found' });
    }

    res
      .status(200)
      .json({ message: 'Comments fetched successfully', comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);
    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment fetched successfully', comment });
  } catch (error) {
    console.error('Error fetching comment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

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
      post: postId,
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

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (content) comment.content = content;

    await comment.save();

    res.status(200).json({ message: 'Comment updated successfully', comment });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await User.updateOne(
      { _id: comment.user },
      { $pull: { comments: comment._id } }
    );

    await Post.updateOne(
      { _id: comment.post },
      { $pull: { comments: comment._id } }
    );

    res.status(200).json({ message: 'Comment deleted successfully', comment });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
