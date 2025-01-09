const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUserById);
router.get('/username/:username', userController.getOneUserByUsername);
router.get('/email/:email', userController.getOneUserByEmail);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/update/:id', userController.updateUserById);
router.delete('/delete/:id', userController.deleteUserById);

module.exports = router;
