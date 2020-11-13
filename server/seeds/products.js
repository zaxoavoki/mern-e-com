const faker = require("faker");

const Category = require("../models/Category");
const Product = require("../models/Product");

module.exports = function seedProducts(count) {
    return new Promise(async (res, rej) => {
        await Product.deleteMany();
        const categories = await Category.find();

        for (let i = 0; i < count; i++) {
            await new Product({
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                images: [faker.image.lorempicsum.image(500, 500, true)],
                price: faker.random.float(),
                category: categories[Math.ceil(Math.random() * categories.length) - 1]._id,
            }).save();
        }
        res();
    });
};
