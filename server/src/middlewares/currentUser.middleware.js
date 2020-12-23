module.exports = function (req, res, next) {
  if (
    !req.user ||
    (req.user._id !== req.params.id && process.env.ROLE_USR === String(req.user.role))
  ) {
    return res.status(403).json({ error: "You do not have permissions." });
  }

  next();
};
