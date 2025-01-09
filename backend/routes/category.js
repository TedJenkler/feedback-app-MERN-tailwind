const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/name/:name', categoryController.getCategoryByName);
router.post('/add', categoryController.addCategory);
router.put('/update/:id', categoryController.updateCategoryById);
router.delete('/delete/:id', categoryController.deleteCategoryById);
router.delete('/deleteAll', categoryController.deleteAllCategories);

module.exports = router;
