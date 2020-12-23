const authMiddleware = require("./auth.middleware");

module.exports = function (req, res, next) {
  authMiddleware(req, res, (req_, res_) => {
    if (req_.user && req_.user.role === 2) {
      return next();
    }
    res_.status(403).json({ error: "You are not an admin." });
  });
};
