const { random } = require("faker");

const User = require("../models/User");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");

module.exports = (count) =>
    new Promise(async (res, rej) => {
        try {
            await Transaction.deleteMany();

            const users = await User.find();
            const products = await Product.find();

            for (let i = 0; i < count; i++) {
                await new Transaction({
                    user: users[random.number(users.length - 1)]._id,
                    product: products[random.number(products.length - 1)]._id,
                    count: random.number({ min: 1, max: 10 }),
                    status: ["Cancelled", "Approved", "Waiting for paying"][random.number(2)],
                }).save();
            }
            res("transcations");
        } catch (err) {
            rej(err);
        }
    });
