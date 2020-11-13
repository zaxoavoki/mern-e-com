const faker = require("faker");

const Category = require("../models/Category");

module.exports = function (count) {
    return new Promise(async (res, rej) => {
        await Category.deleteMany();
        for (let i = 0; i < count; i++) {
            await new Category({
                name: faker.lorem.word(),
                description: faker.lorem.sentence(),
            }).save();
        }
        res();
    });
};
