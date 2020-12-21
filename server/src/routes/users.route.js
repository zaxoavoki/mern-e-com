const { Router } = require("express");

const UserService = require("../services/user.service");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

const router = Router();

router.put("/:id", [authMiddleware], async (req, res) => {
  if (req.user._id !== req.params.id && process.env.ROLE_USR === req.user.role) {
    // Does not belong to business-logic
    return res.status(500).json({ error: "You do not have permissions." });
  }

  try {
    res.status(200).json({ user: await UserService.updateOneById(req.params.id, req.body) });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.delete("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    res.status(200).json({ user: await UserService.deleteOneById(req.params.id) });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.status(200).json({ user: await UserService.getOneById(req.params.id) });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    res.status(200).json({ users: await UserService.getAll(req.query) });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

module.exports = router;
