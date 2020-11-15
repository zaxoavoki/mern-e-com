const express = require("express");

// Routers
const authRouter = require("./auth");
const adminRouter = require("./admin/admin");
const userRouter = require("./users/index");
const productRouter = require("./products/products");
const categoryRouter = require("./categories/categories");

// Middlewares
const authMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");

const router = express.Router();

router.use("/admin", [authMiddleware, adminMiddleware], adminRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use(
    "/",
    (req, res, next) => {
        if (req.headers.authorization) {
            return res.status(403).json({ error: "Only guests can visit this page" });
        }
        next();
    },
    authRouter
);

module.exports = router;
