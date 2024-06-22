const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllPost);
router.get('/:id', postController.getPostById);
router.post('/add', postController.addPost);

module.exports = router