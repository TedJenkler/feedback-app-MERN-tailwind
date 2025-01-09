const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddlewere = require('../middlewere/authMiddlewere');

router.get('/', commentController.getAll);
router.get('/:id', commentController.getCommentById);
router.post('/add', authMiddlewere, commentController.addComment);
router.put('/update/:id', commentController.updateComment);
router.delete('/delete/:id', commentController.deleteComment);

module.exports = router;
