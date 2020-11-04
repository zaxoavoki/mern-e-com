const express = require("express");
const User = require("../../models/User");

const router = express.Router();

router.get("/users/:id", async (req, res) => {
	const user = await User.findOne({ _id: req.params.id }).select("-password");
	if (user) {
		return res.status(200).json({ user });
	}

	res.status(404).json({ error: "User not found" });
});

router.get("/user", async (req, res) => {
	res.status(200).json(await User.find());
});

module.exports = router;
