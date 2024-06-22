const User = require('../models/userSchema');
const Comment = require('../models/commentSchema');
const Reply = require('../models/replySchema');

exports.getAllReplies = async (req, res) => {
    try {
        const replies = await Reply.find();
        if (replies.length === 0) {
            return res.status(404).json({ message: 'No replies found' });
        }

        res.status(200).json({ message: 'Replies fetched successfully', replies });
    }catch (error) {
        console.error('Error fetching replies', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getReplyById = async (req, res) => {
    try {
        const { id } = req.params;

        const reply = await Reply.findById(id);
        if(!reply) {
            return res.status(404).json({ message: 'No reply found' })
        }

        res.status(200).json({ message: 'Reply fetched successfully', reply });
    }catch (error) {
        console.error('Error fetching reply', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.addReply = async (req, res) => {
    try {
        const { content, user, replyId } = req.body;
        const { id } = req.params;

        let parentDocument;

        if (replyId === "comment") {
            parentDocument = await Comment.findById(id);
        } else {
            parentDocument = await Reply.findById(id);
        }

        if (!parentDocument) {
            console.error(`Parent document (Comment or Reply) not found for id: ${id}`);
            return res.status(404).json({ message: 'Parent document (Comment or Reply) not found' });
        }

        const userToUpdate = await User.findOne({ username: user });
        if (!userToUpdate) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newReply = new Reply({
            content,
            user: userToUpdate._id
        });

        await newReply.save();

        userToUpdate.replies.push(newReply._id);
        await userToUpdate.save();

        parentDocument.replies.push(newReply._id);
        await parentDocument.save();

        res.status(200).json({ message: 'Added reply successfully', newReply });
    } catch (error) {
        console.error('Error adding reply', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

