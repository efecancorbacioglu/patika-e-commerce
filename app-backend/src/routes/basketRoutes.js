const express = require("express");
const basketController = require("../controllers/basketController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, basketController.add);
router.post("/update", authMiddleware, basketController.updateQuantity);
router.get("/get", authMiddleware, basketController.get);
router.post("/remove", authMiddleware, basketController.remove);
router.post("/clear", authMiddleware, basketController.clear);

module.exports = router;
