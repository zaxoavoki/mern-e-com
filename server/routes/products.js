const { Router } = require("express");

const authMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");

const User = require("../models/User");
const Product = require("../models/Product");
const Comment = require("../models/Comment");
const Transcation = require("../models/Transaction");
const Rating = require("../models/Rating");

const router = Router();

router.get("/", async (req, res) => {
  res.status(200).json(await Product.find());
});

router.get("/saved", [authMiddleware], async (req, res) => {
  res
    .status(200)
    .json((await User.findOne({ _id: req.user._id }, "saved").populate("saved")).saved);
});

router.get("/bought", [authMiddleware], async (req, res) => {
  const transactions = await Transcation.find({ user: req.user._id }).populate("product");
  if (!transactions) {
    return res.status(500).json({ error: "Something went wrong" });
  }
  res.status(200).json(transactions.map((e) => e.product));
});

router.get("/popular", async (req, res) => {
  const products = await Rating.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "products",
      },
    },
    {
      $unwind: "$products",
    },
    {
      $group: {
        _id: "$stars",
        products: { $addToSet: "$products" },
      },
    },
    {
      $sort: {
        _id: -1,
      },
    },
  ]);

  res.status(200).json(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id }).populate("category");
  if (!product) {
    return res.status(404).json({ error: "Product was not found" });
  }
  res.status(200).json(product);
});

router.put("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
  // update product's info in db
  // new data is stored in req.body
});

router.delete("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
  Product.findOneAndRemove({ _id: req.params.id }, (err, doc) => {
    if (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
    res.status(200).json(doc);
  });
});

router.get("/:productId/comments", async (req, res) => {
  res.status(200).json(await Comment.find({ product: req.params.productId }));
});

router.get("/save/:id", [authMiddleware], async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  const product = await Product.findOne({ _id: req.params.id });

  if (!user || !product) {
    return res.status(404).json({ error: "Product or user was not found." });
  }

  const idx = user.saved.findIndex((e) => e == String(product._id));
  if (idx === -1) {
    user.saved.push(product);
  } else {
    user.saved.splice(idx, 1);
  }

  await user.save();
  res.status(200).json(idx === -1);
});

router.get("/is_saved/:id", [authMiddleware], async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  const product = await Product.findOne({ _id: req.params.id });

  if (!user || !product) {
    return res.status(404).json({ error: "Product or user was not found." });
  }

  // TODO: Rewrite with route above
  res.status(200).json(user.saved.findIndex((e) => e == String(product._id)) !== -1);
});

module.exports = router;
