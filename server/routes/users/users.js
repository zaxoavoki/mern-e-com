const { Router } = require("express");

const authMiddleware = require("../../middlewares/auth");
const adminMiddleware = require("../../middlewares/admin");

const router = Router();

/**
 * Update unique user in DB.
 *
 * @method  PUT
 * @route   /users/:id
 */
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

/**
 * Remove unique user from DB via id.
 *
 * @method  DELETE
 * @route   /users/:id
 */
router.delete("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (user) {
        return res.status(200).json(user);
    }
    res.status(500).json({ error: "User was not found" });
});

/**
 * Get unique user from DB via id.
 *
 * @method  GET
 * @route   /users/:id
 */
router.get("/:id", async (req, res) => {
    const user = await User.find({ _id: req.params.id }).select("-password -saved");
    if (user) {
        return res.status(200).json(user);
    }
    res.status(404).json({ error: "User not found" });
});

/**
 * Get all users from DB. You need to be authorized.
 *
 * @method  GET
 * @route   /users
 */
router.get("/", [authMiddleware], async (req, res) => {
    res.status(200).json(await User.find().select("-password -saved"));
});

module.exports = router;
// TODO: Fix all routes with error handler
