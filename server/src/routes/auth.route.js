const jwt = require("jsonwebtoken");
const { Router } = require("express");

const User = require("../models/User");
const guestMiddleware = require("../middlewares/guest");
const authMiddleware = require("../middlewares/auth");
const AuthService = require("../services/auth.service");

const router = Router();

router.post("/login", [guestMiddleware], async (req, res) => {
  try {
    res.status(200).json({ token: await AuthService.login({ ...req.body }) });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.post("/register", [guestMiddleware], async (req, res) => {
  // where shoud I leave this?
  // should I add this to the service?
  if (req.body.password !== req.body.password_confirmation) {
    return res.status(403).json({ error: "Passwords do not match" });
  }

  try {
    res.status(201).json({ token: await AuthService.register({ ...req.body }) });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.get("/refresh/token", [authMiddleware], async (req, res) => {
  // TODO: To replace with AuthService.refresh()
  const user = await User.findOne({ _id: req.user._id });
  if (!user) {
    return res.status(404).json({ error: "User was not found. " });
  }

  const token = jwt.sign(
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

module.exports = router;
