const { Router } = require("express");

const router = Router();

const authRouter = require("./auth");
const userRouter = require("./users");
const productRouter = require("./products");
const commentsRouter = require("./comments");
const categoryRouter = require("./categories");

router.use(authRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/comments", commentsRouter);
router.use("/categories", categoryRouter);

module.exports = router;
