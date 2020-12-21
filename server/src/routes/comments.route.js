const { Router } = require("express");

const Comment = require("../models/Comment");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/", async (req, res) => {
  // add comment for product with id req.params.productId
});

router.get("/:id", async (req, res) => {
  res.status(200).json(await Comment.findOne({ _id: req.params.id }));
});

router.put("/:id", async (req, res) => {
  // update comment
});

router.delete("/:id", [authMiddleware], async (req, res) => {
  const comment = await Comment.findOneAndRemove({ _id: req.params.id, user: req.user._id });
  if (!comment) {
    return res.status(404).json({ error: "Comment was not found or you do not have permissions." });
  }
  res.status(200).json(comment);
});

module.exports = router;
