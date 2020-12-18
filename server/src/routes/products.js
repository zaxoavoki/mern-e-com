const { Router, response } = require("express");

const authMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");

const User = require("../models/User");
const Product = require("../models/Product");
const Comment = require("../models/Comment");
const Transcation = require("../models/Transaction");
const Rating = require("../models/Rating");

const router = Router();

// get only saved products by user
router.get("/saved", [authMiddleware], async (req, res) => {
  User.findOne({ _id: req.user._id }, "saved")
    .populate("saved")
    .then((user) => res.json(user.saved))
    .catch(() => res.status(500).json("Something went wrong."));
});

// get products which user bought
router.get("/bought", [authMiddleware], async (req, res) => {
  Transcation.find({ user: req.user._id })
    .populate("product")
    .then((ts) => res.json(ts.map((e) => e.product)))
    .catch(() => res.status(500).json({ error: "Something went wrong" }));
});

// get product by id
router.get("/:id", async (req, res) => {
  Product.findOne({ _id: req.params.id })
    .populate("category")
    .then((product) => res.json(product))
    .catch(() => res.status(500).json({ error: "Something went wrong" }));
});

// update product by id
router.put("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
  // update product's info in db
  // new data is stored in req.body
});

// delete product by id
router.delete("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
  Product.findOneAndRemove({ _id: req.params.id })
    .then((doc) => res.json(doc))
    .catch(() => res.status(500).json({ error: "Something went wrong" }));
});

// get all comments which belong to product
router.get("/:productId/comments", async (req, res) => {
  res.status(200).json(await Comment.find({ product: req.params.productId }));
});

// save product to the saved list
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

// check if product is in saved list
router.get("/is_saved/:id", [authMiddleware], async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  const product = await Product.findOne({ _id: req.params.id });

  if (!user || !product) {
    return res.status(404).json({ error: "Product or user was not found." });
  }

  // TODO: Rewrite with route above
  res.status(200).json(user.saved.findIndex((e) => e == String(product._id)) !== -1);
});

// get all products
router.get("/", async (req, res) => {
  const { sort } = req.query;

  try {
    if (sort === "most_popular" || sort === "less_popular") {
      return res.json(
        await Product.aggregate([
          {
            $lookup: {
              from: "transactions",
              localField: "_id",
              foreignField: "product",
              as: "transactions",
            },
          },
          {
            $addFields: {
              transactions: {
                $reduce: {
                  input: "$transactions",
                  initialValue: 0,
                  in: {
                    $add: [
                      { $cond: [{ $eq: ["$$this.status", "Approved"] }, "$$this.count", 0] },
                      "$$value",
                    ],
                  },
                },
              },
            },
          },
          { $sort: { transactions: sort === "less_popular" ? 1 : -1 } },
        ])
      );
    }

    if (sort === "most_rated") {
      const products = await Product.aggregate([
        {
          $lookup: {
            from: "ratings",
            localField: "_id",
            foreignField: "product",
            as: "stars",
          },
        },
        {
          $addFields: {
            stars: {
              $reduce: {
                input: "$stars",
                initialValue: 0,
                in: { $avg: "$$this.stars" },
              },
            },
          },
        },
        { $sort: { stars: -1 } },
      ]);

      return res.json(products);
    }

    let field;
    if (sort === "highest_price") field = "-price";
    if (sort === "lowest_price") field = "price";
    if (sort === "newest") field = "created_at";
    res.json(await Product.find().sort(field));
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
