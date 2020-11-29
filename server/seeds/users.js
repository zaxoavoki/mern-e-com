const { internet } = require("faker");
const { hashSync } = require("bcrypt");
const gravatar = require("gravatar");

const User = require("../models/User");

module.exports = (count) =>
  new Promise(async (res, rej) => {
    try {
      await User.deleteMany();
      for (let i = 0; i < count; i++) {
        await new User({
          username: internet.userName(),
          email: internet.email(),
          avatar: gravatar.url(internet.email(), {
            s: "250",
            d: "identicon",
            r: "pg",
          }),
          password: hashSync("password", 10),
          role: Math.random() < 0.2 ? 2 : Math.random() < 0.3 ? 1 : 0,
        }).save();
      }
      res("user");
    } catch (err) {
      rej(err);
    }
  });
