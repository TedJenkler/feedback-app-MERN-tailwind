const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* User */

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUserById);
router.get('/username/:username', userController.getOneUserByUsername);
router.get('/email/:email', userController.getOneUserByEmail);
router.post('/register', userController.registerUser);

module.exports = router;