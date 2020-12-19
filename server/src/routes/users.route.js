const validator = require("validator");
const { Router } = require("express");

const User = require("../models/User");
const authMiddleware = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/admin");

const router = Router();

// {user} or {error}
router.put("/:id", [authMiddleware], async (req, res) => {
  if (req.user._id !== req.params.id) {
    return res.status(500).json({ error: "You do not have permissions." });
  }

  // validate incoming data
  if (!validator.isEmail(req.body.email || "") || validator.isEmpty(req.body.username || "")) {
    return res.status(406).json({ error: "Invalid data." });
  }

  try {
    // Check if email is already in use
    const user = await User.findOne({ email: req.body.email });
    if (user && user._id != req.user._id) {
      console.log(user, req.user._id);
      return res.status(403).json({ error: "Email is already in use." });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        email: req.body.email,
        username: req.body.username,
      },
      { new: true, projection: "-password" }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// {user} or null or {error}
router.delete("/:id", [authMiddleware, adminMiddleware], (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User was not found." });
      }
      res.json(user);
    })
    .catch(() => res.status(500).json({ error: "Something went wrong." }));
});

// Returns {user} or {error}
router.get("/:id", (req, res) => {
  User.findById(req.params.id, "-password -saved")
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User was not found." });
      }
      res.json(user);
    })
    .catch(() => res.status(500).json({ error: "Something went wrong." }));
});

// Returns [users] || [] or {error}
router.get("/", (req, res) => {
  User.find({}, "-password -saved")
    .sort(req.query.sort)
    .limit(+req.query.limit || 10)
    .then((users) => res.json(users))
    .catch(() => res.status(500).json({ error: "Something went wrong" }));
});

module.exports = router;
