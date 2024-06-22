const express = require('express');
const router = express.Router();
const replyController = require('../controllers/replyController');

router.post('/add/:id', replyController.addReply);

module.exports = router;