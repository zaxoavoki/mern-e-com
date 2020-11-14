const express = require("express");

const authMiddleware = require("../../middlewares/auth");

const router = express.Router();

router.get("/saved", [authMiddleware], async (req, res) => {
    // code here
});

router.get("/bought", [authMiddleware], async (req, res) => {
    // code here
});

module.exports = router;
