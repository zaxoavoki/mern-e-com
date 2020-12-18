const { internet } = require("faker");
const AuthController = require("../src/controllers/auth.controller");
const UserRepository = require("../src/repositories/odm/user.repository");

module.exports = async ({ count }) => {
  try {
    await UserRepository.deleteAll();
  } catch (err) {}

  for (let i = 0; i < count; i++) {
    await AuthController.register({
      username: internet.userName(),
      email: internet.email(),
      password: "password",
      role: Math.random() < 0.2 ? 2 : Math.random() < 0.3 ? 1 : 0,
    });
  }
};
