const { random } = require("faker");

const Rating = require("../models/Rating");
const Transaction = require("../models/Transaction");

module.exports = (count) =>
    new Promise(async (res, rej) => {
        try {
            await Rating.deleteMany();

            const transcations = await Transaction.find();

            for (let i = 0; i < count; i++) {
                const idx = random.number(transcations.length - 1);
                const rate = await Rating.findOne({
                    user: transcations[idx].user,
                    product: transcations[idx].product,
                });

                if (rate) {
                    --i;
                    continue;
                }

                await new Rating({
                    user: transcations[idx].user,
                    product: transcations[idx].product,
                    stars: random.number(5),
                }).save();
            }
            res("rating");
        } catch (err) {
            rej(err);
        }
    });
