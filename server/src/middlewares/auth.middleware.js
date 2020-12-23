const jwt = require("jsonwebtoken");
// TODO: Change to service
const UserRepository = require("../repositories/odm/user.repository");

module.exports = async function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "You do not have permissions." });
  }

  try {
    const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.user = decoded;

    if (!(await UserRepository.getOneById(req.user._id, "-password -saved"))) {
      return res.status(404).json({ error: "User was not found" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
