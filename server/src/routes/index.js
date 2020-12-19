const { Router } = require("express");

const router = Router();

const authRouter = require("./auth.route");
const userRouter = require("./users.route");
const productRouter = require("./products.route");
const commentsRouter = require("./comments.route");
const categoryRouter = require("./categories.route");

router.use(authRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/comments", commentsRouter);
router.use("/categories", categoryRouter);

module.exports = router;
