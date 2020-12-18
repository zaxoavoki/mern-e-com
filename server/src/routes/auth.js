const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { Router } = require("express");

const User = require("../models/User");
const guestMiddleware = require("../middlewares/guest");
const authMiddleware = require("../middlewares/auth");
const AuthController = require("../controllers/auth.controller");

const router = Router();

router.post("/login", [guestMiddleware], async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ error: "User was not found" });
  }

  const result = await bcrypt.compare(req.body.password || "", user.password);
  if (!result) {
    return res.status(403).json({ error: "Wrong password" });
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

// FIXME
// router.post("/register", [guestMiddleware], async (req, res) => {
//   if (req.body.password !== req.body.password_confirmation) {
//     return res.status(403).json({ error: "Passwords do not match" });
//   }

//   const user = await User.findOne({ email: req.body.email });
//   if (user) {
//     return res.status(403).json({ error: "User already exist" });
//   }

//   try {
//     const token = await AuthController.register({ ...req.body });
//     if (token) {
//       return res.status(201).json({ token });
//     }
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

router.get("/refresh/token", [authMiddleware], async (req, res) => {
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
