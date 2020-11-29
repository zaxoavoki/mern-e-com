const { lorem } = require("faker");

const Category = require("../models/Category");

module.exports = (count) =>
  new Promise(async (res, rej) => {
    try {
      await Category.deleteMany();
      for (let i = 0; i < count; i++) {
        await new Category({
          name: lorem.word(),
          description: lorem.sentence(),
        }).save();
      }
      res("categories");
    } catch (err) {
      rej(err);
    }
  });
