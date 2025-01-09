const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema({
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
  date: {
    type: Date,
    default: Date.now,
  },
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reply',
    },
  ],
  replyTo: {},
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;
