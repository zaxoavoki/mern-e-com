module.exports = function (req, res, next) {
  if (req.headers.authorization) {
    return res.status(403).json({ error: "Only guests can visit this page" });
  }
  next();
};
