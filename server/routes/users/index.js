const express = require("express");

const authMiddleware = require("../../middlewares/auth");

// Subroutes
const userRoutes = require("./users");
const userProductRoutes = require("./products");

const router = express.Router();

router.use("/", [authMiddleware], userProductRoutes);
router.use("/", userRoutes);

module.exports = router;
