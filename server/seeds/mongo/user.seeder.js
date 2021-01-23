const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { internet } = require("faker");

const UserRepository = require("../../src/repositories/odm/user.repository");

module.exports = async ({ count }) => {
  try {
    await UserRepository.deleteAll();
  } catch (err) {}

  for (let i = 0; i < count; i++) {
    const email = internet.email();
    await UserRepository.create({
      username: internet.userName(),
      email,
      password: await bcrypt.hash("password", parseInt(process.env.SALT_ROUNDS || 8)),
      role: Math.random() < 0.2 ? 2 : Math.random() < 0.3 ? 1 : 0,
      avatar: gravatar.url(email, {
        s: process.env.GRAVATAR_IMG_SIZE,
        d: process.env.GRAVATAR_IMG_DEFAULT,
        r: process.env.GRAVATAR_IMG_RATE,
      }),
    });
  }
};
