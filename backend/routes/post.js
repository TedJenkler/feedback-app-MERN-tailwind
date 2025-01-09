const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllPost);
router.get('/:id', postController.getPostById);
router.post('/add', postController.addPost);
router.put('/update/:id', postController.updatePostByID);
router.delete('/delete/:id', postController.deletePostById);
router.delete('/delete', postController.deleteAll);

router.put('/upvote/:id', postController.upvotePostById);

module.exports = router;
