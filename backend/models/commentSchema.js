const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reply',
    },
  ],
  date: String,
  post: String,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
