const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/name/:name', categoryController.getCategoryByName);
router.post('/add', categoryController.addCategory);

module.exports = router