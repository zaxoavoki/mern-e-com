const express = require("express");
const validator = require("validator");

const authMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");

const Category = require("../models/Category");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  return res.status(200).json(await Category.find());
});

router.get("/:id", async (req, res) => {
  res.status(200).json({
    ...(await Category.findOne({ _id: req.params.id }, {}, { lean: true })),
    products: await Product.find({ category: req.params.id }),
  });
});

router.put("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
  // update category in db
  // new data is located in req.body
});

router.post("/", [authMiddleware, adminMiddleware], async (req, res) => {
  if (validator.isEmpty(req.body.name || "") || validator.isEmpty(req.body.description || "")) {
    return res.status(406).json({ error: "Invalid data." });
  }

  try {
    res.status(201).json(
      await new Category({
        name: req.body.name,
        description: req.body.description,
      }).save()
    );
  } catch (err) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

router.delete("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    res.status(200).json(await Category.findOneAndRemove({ _id: req.params.id }));
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
