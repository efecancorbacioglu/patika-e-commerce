const productService = require("../services/productService");
// const kafka = require("../utils/kafka");

const productController = {
  create: async (req, res) => {
    const { name, description, price, stock, image } = req.body;
    if (!name) {
      return res.status(502).send({ message: "name is required" });
    }
    if (!price) {
      return res.status(502).send({ message: "price is required" });
    }
    try {
      const response = await productService.create(req.body);
      res.status(200).send({ response: response });
    } catch (e) {
      console.log(e, "error");
    }
  },
  update: async (req, res) => {
    const { name, description, price, stock, image } = req.body;
    if (!name) {
      return res.status(502).send({ message: "name is required" });
    }
    if (!price) {
      return res.status(502).send({ message: "price is required" });
    }
    if (!description) {
      return res.status(502).send({ message: "description is required" });
    }
    if (!stock) {
      return res.status(502).send({ message: "stock is required" });
    }

    try {
      const response = await productService.update(req.body);
      res.status(200).send({ response: response });
    } catch (e) {
      console.log(e, "error");
    }
  },
  delete: async (req, res) => {
    const { id } = req.body;
    if (!id) {
      return res.status(502).send({ message: "id is required" });
    }
    try {
      const response = await productService.deleteProduct(id);
      res.status(200).send({ response: response });
    } catch (e) {
      console.log(e, "error");
    }
  },
  getAll: async (req, res) => {
    try {
      const response = await productService.getAll();
      res.status(200).send({ response: response });
    } catch (e) {
      console.log(e, "error");
    }
  },
  getSingle: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productService.getSingle({ id });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};
module.exports = productController;
