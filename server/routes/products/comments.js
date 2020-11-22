const { Router } = require("express");

const Product = require("../../models/Product");
const Comment = require("../../models/Comment");

const router = Router();

router.get("/:productId/comments", async (req, res) => {
    // get all comments which belong to Product with id req.params.productId
});

router.get("/:productId/comments/:commentId", async (req, res) => {
    // get comment for product with id req.params.productId
});

router.post("/:productId/comments", async (req, res) => {
    // add comment for product with id req.params.productId
});

router.put("/:productId/comments/:commentId", async (req, res) => {
    // update comment
});

module.exports = router;
