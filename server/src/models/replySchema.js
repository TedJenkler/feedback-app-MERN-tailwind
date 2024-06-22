const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: String
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;