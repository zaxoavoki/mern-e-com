module.exports = function (req, res, next) {
  if (!req.user || String(req.user.role) === process.env.ROLE_USR) {
    res.status(403).json({ error: "You do not have admin permissions" });
  }
  next();
};
