const express = require("express");

// Routers
const authRouter = require("./auth");
const adminRouter = require("./admin/admin");

// Middlewares
const authMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");

const router = express.Router();

router.use("/admin", [authMiddleware, adminMiddleware], adminRouter);
router.use(
	"/",
	function (req, res, next) {
		if (req.headers.authorization) {
			return res.status(403).json({ error: "Only guests can visit this page" });
		}
		next();
	},
	authRouter
);

module.exports = router;
