const express = require("express");

const Category = require("../../models/Category");
const Product = require("../../models/Product");

const router = express.Router();

/**
 * Get all categories from DB.
 *
 * @method  GET
 * @route   /categories
 */
router.get("/", async (req, res) => {
    return res.status(200).json(await Category.find());
});

/**
 * Get one category by id with populated products.
 *
 * @method  GET
 * @route   /categories/:id
 */
router.get("/:id", async (req, res) => {
    return res.status(200).json({
        ...(await Category.findOne({ _id: req.params.id }, {}, { lean: true })),
        products: await Product.find({ category: req.params.id }),
    });
});

module.exports = router;
