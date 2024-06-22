const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/', commentController.getAll);
router.get('/:id', commentController.getCommentById);
router.post('/add', commentController.addComment);

module.exports = router;