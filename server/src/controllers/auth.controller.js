const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const validator = require("validator");

const UserRepository = require("../repositories/odm/user.repository");

class AuthController {
  constructor() {}

  async register({ username, email, password, role }) {
    if (
      !validator.isLength(username, { min: 3, max: 24 }) ||
      !validator.isEmail(email) ||
      !validator.isLength(password, { min: 6, max: 32 })
    ) {
      throw new Error("Invalid user data");
    }

    const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS || 8));
    const avatar = gravatar.url(email, {
      s: process.env.GRAVATAR_IMG_SIZE,
      d: process.env.GRAVATAR_IMG_DEFAULT,
      r: process.env.GRAVATAR_IMG_RATE,
    });

    const user = await UserRepository.create({
      email,
      password: hash,
      username,
      avatar,
      role: role || 0,
    });

    return jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE_IN }
    );
  }
}

module.exports = new AuthController();
