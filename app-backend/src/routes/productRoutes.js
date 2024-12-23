const express = require("express");
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/",authMiddleware, productController.create);
router.put("/",authMiddleware, productController.update);
router.get("/", productController.getAll);
router.get("/:id", productController.getSingle);
router.delete("/",authMiddleware, productController.delete);

module.exports = router;
