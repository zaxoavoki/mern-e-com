const { Router } = require("express");

const guestMiddleware = require("../middlewares/guest.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
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
  try {
    res.status(201).json({ token: await AuthService.register({ ...req.body }) });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

router.get("/refresh/token", [authMiddleware], async (req, res) => {
  try {
    res.status(200).json({ token: await AuthService.refreshToken(req.headers.authorization) });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

module.exports = router;
