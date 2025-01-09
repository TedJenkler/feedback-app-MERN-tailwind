const express = require('express');
const router = express.Router();
const replyController = require('../controllers/replyController');
const authMiddlewere = require('../middlewere/authMiddlewere');

router.get('/', replyController.getAllReplies);
router.get('/:id', replyController.getReplyById);
router.post('/add/:id', authMiddlewere, replyController.addReply);
router.put('/update/:id', replyController.updateReplyByID);
router.delete('/delete/:id', replyController.deleteReplyById);

module.exports = router;
