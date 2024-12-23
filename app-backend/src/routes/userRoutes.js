const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router(); 
router.put('/update', authMiddleware, userController.updateUser)
router.delete('/delete/:id',authMiddleware, userController.deleteUser)

module.exports = router;