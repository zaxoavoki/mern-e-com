const CommentService = require("../services/comment.service");

module.exports = async function (req, res, next) {
  try {
    const comment = await CommentService.getOneById(req.params.id);
    if (
      !req.user ||
      (String(comment.user) !== req.user._id && String(req.user.role) === process.env.ROLE_USR)
    ) {
      throw new Error("You do not have permissions");
    }
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
  // FIXME: Put this logic into service

  next();
};
