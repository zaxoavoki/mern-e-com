const { Router } = require("express");

const CategoryService = require("../services/category.service");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

const router = Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).json({ categories: CategoryService.getAll() });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.status(200).json({ category: await CategoryService.getOneById(req.params.id) });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.put("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    res
      .status(200)
      .json({ category: await CategoryService.updateOneById(req.params.id, req.body) });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.post("/", [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    res.status(201).json({ category: await CategoryService.create(req.body) });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.delete("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    res.status(200).json({ category: await CategoryService.deleteOneById(req.params.id) });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

module.exports = router;
