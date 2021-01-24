const { Router } = require("express");

const ProductService = require("../services/product.service");

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    res.status(200).json(await ProductService.getOneById(req.params.id));
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.put("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    res.status(200).json(await ProductService.updateById(req.params.id, req.body));
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.delete("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    res.status(200).json(await ProductService.deleteOneById(req.params.id));
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    res.status(200).json(await ProductService.getAll(req.query));
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

module.exports = router;
