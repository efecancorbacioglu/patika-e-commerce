const express = require("express");
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const validateOrder = require("../middleware/validateOrder");

const router = express.Router();

router.post("/create", authMiddleware, validateOrder, orderController.create);
router.get("/getAll", authMiddleware, orderController.getAll);
router.get("/:id", authMiddleware, orderController.getSingle);
router.delete("/:id", authMiddleware, orderController.delete);

module.exports = router;
