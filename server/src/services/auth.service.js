const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const validator = require("validator");

const UserRepository = require("../repositories/odm/user.repository");

class AuthService {
  generateUserJWT(user) {
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

  async refreshToken(token) {
    // should I get token or user here?
  }

  async login({ email, password }) {
    if (
      !validator.isLength(password || "", { min: 6, max: 32 }) ||
      !validator.isEmail(email || "")
    ) {
      throw new Error("Invalid data");
    }

    const user = await UserRepository.getOneByEmail(email);
    if (!user) {
      throw new Error("User does not exists");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Wrong password");
    }

    return this.generateUserJWT(user);
  }

  async register({ username, email, password, role }) {
    if (
      !validator.isLength(username || "", { min: 3, max: 32 }) ||
      !validator.isEmail(email || "") ||
      !validator.isLength(password || "", { min: 6, max: 32 })
    ) {
      throw new Error("Invalid user data");
    }

    if (await UserRepository.getOneByEmail(email)) {
      throw new Error("User already exist");
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

    return this.generateUserJWT(user);
  }
}

module.exports = new AuthService();
