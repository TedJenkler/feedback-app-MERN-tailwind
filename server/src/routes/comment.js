const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/add', commentController.addComment);

module.exports = router;