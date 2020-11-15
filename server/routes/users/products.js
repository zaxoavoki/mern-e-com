const express = require("express");

const User = require("../../models/User");
const Product = require("../../models/Product");
const Transaction = require("../../models/Transaction");

const router = express.Router();

// Get saved products by current user via jwt token
router.get("/saved", async (req, res) => {
    res.status(200).json(
        (await User.findOne({ _id: req.user._id }, "saved").populate("saved")).saved
    );
});

// Get products bought by current user via jwt token
router.get("/bought", async (req, res) => {
    // TODO: Think about transactions and orders collections
    res.status(200);
});

// Save product to user collection
router.get("/save/:productId", async (req, res) => {
    // TODO: Check for copies
    const user = await User.findOne({ _id: req.user._id });
    const product = await Product.findOne({ _id: req.params.productId });
    if (!user || !product) {
        return res.status(404).json({ error: "Product or user was not found." });
    }
    user.saved.push(product);
    await user.save();
    res.status(200).json(product);
});

module.exports = router;
