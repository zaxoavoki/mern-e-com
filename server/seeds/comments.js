const { lorem, random, image } = require("faker");

const User = require("../models/User");
const Comment = require("../models/Comment");
const Product = require("../models/Product");

module.exports = (count) =>
    new Promise(async (res, rej) => {
        try {
            await Comment.deleteMany();

            const users = await User.find();
            const products = await Product.find();

            for (let i = 0; i < count; i++) {
                await new Comment({
                    user: users[random.number(users.length - 1)]._id,
                    product: products[random.number(products.length - 1)]._id,
                    text: lorem.text(2),
                    images: Array.from({ length: random.number(5) }, () => image.imageUrl()),
                }).save();
            }
            res("comments");
        } catch (err) {
            return rej(err);
        }
    });
