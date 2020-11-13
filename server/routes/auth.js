const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

// User log in
router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({ error: "User was not found" });
    }

    const result = await bcrypt.compare(req.body.password || "", user.password);
    if (!result) {
        return res.status(403).json({ error: "Wrong password" });
    }

    const token = await jwt.sign(
        {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h",
        }
    );

    if (token) {
        return res.status(200).json({ token });
    }

    res.status(500).json({ error: "Something went wrong" });
});

// User sign up
router.post("/register", async (req, res) => {
    if (req.body.password !== req.body.password_confirmation) {
        return res.status(403).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(403).json({ error: "User already exist" });
    }

    const newUser = await new User({
        email: req.body.email,
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
    }).save();

    const token = await jwt.sign(
        {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h",
        }
    );

    if (token) {
        return res.status(201).json({ token });
    }

    res.status(500).json({ error: "Something went wrong" });
});

module.exports = router;
