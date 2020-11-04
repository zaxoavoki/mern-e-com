const express = require("express");
const User = require("../../models/User");
const Product = require("../../models/Product");

const router = express.Router();

router.post("/users", async (req, res) => {
	res.status(200).json(await User.find().select("-password"));
});

router.post("/products", async (req, res) => {
	res.status(200).json(await Product.find());
});

module.exports = router;
