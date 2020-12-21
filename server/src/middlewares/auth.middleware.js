const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "You do not have permissions." });
  }

  jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token has expired. Please, log in again." });
    }

    req.user = decoded;
    User.findOne({ _id: req.user._id })
      .then((user) => {
        if (user) {
          return next();
        }
        throw new Error();
      })
      .catch(() => res.status(500).json({ error: "Something went wrong." }));
  });
};
