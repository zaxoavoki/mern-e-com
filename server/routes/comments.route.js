const { Router } = require("express");

const CommentService = require("../services/comment.service");
const authMiddleware = require("../middlewares/auth.middleware");
const canManageCommentMiddleware = require("../middlewares/canManageComment.middleware");

const router = Router();

router.post("/:productId", [authMiddleware], async (req, res) => {
  try {
    res.status(201).json({
      comment: await CommentService.create({
        ...req.body,
        user: req.user._id,
        product: req.params.productId,
      }),
    });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.get("/:productId/comments", async (req, res) => {
  try {
    res.status(200).json({ comment: await CommentService.getAllInProduct(req.params.productId) });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.status(200).json({ comment: await CommentService.getOneById(req.params.id) });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.put("/:id", [authMiddleware, canManageCommentMiddleware], async (req, res) => {
  try {
    res
      .status(200)
      .json({ comment: await CommentService.updateById(req.params.id, { ...req.body }) });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.delete("/:id", [authMiddleware, canManageCommentMiddleware], async (req, res) => {
  try {
    res.status(200).json({ comment: await CommentService.deleteById(req.params.id) });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

module.exports = router;
