const { random } = require("faker");

const User = require("../models/User");
const Product = require("../models/Product");

module.exports = (count) =>
  new Promise(async (res, rej) => {
    try {
      const users = await User.find();
      const products = await Product.find();

      for (let i = 0; i < count; i++) {
        const userIdx = random.number(users.length - 1);
        users[userIdx].saved.push(products[random.number(products.length - 1)]._id);
        await users[userIdx].save();
      }
      res("saved");
    } catch (err) {
      rej(err);
    }
  });
