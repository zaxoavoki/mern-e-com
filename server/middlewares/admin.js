module.exports = function (req, res, next) {
    if (req.user && req.user.role === 2) {
        return next();
    }
    res.status(403).json({ error: "You are not an admin." });
};
