const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router(); 

router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser)
router.delete('/delete/:id',authMiddleware, userController.deleteUser)

module.exports = router;