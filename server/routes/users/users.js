const express = require("express");

const authMiddleware = require("../../middlewares/auth");
const adminMiddleware = require("../../middlewares/admin");

const User = require("../../models/User");

const router = express.Router();

// Find unique user and update
router.put("/:id", [authMiddleware], async (req, res) => {
    if (req.user._id === req.params.id) {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                email: req.body.email || req.user.email,
                username: req.body.username || req.user.username,
            }
        );
        return res.status(200).json(user);
    }
    res.status(500).json({ error: "You do not have permissions." });
});

// Find unique user by id and remove from db
router.delete("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (user) {
        return res.status(200).json(user);
    }
    res.status(500).json({ error: "User was not found" });
});

// Get unique user by id
router.get("/:id", async (req, res) => {
    const user = await User.find({ _id: req.params.id }).select("-password");
    if (user) {
        return res.status(200).json(user);
    }
    res.status(404).json({ error: "User not found" });
});

// Get all users
router.get("/", [authMiddleware], async (req, res) => {
    res.status(200).json(await User.find().select("-password"));
});

module.exports = router;
