const { commerce, image, random } = require("faker");

const Category = require("../models/Category");
const Product = require("../models/Product");

module.exports = (count) =>
    new Promise(async (res, rej) => {
        try {
            await Product.deleteMany();
            const categories = await Category.find();

            for (let i = 0; i < count; i++) {
                await new Product({
                    title: commerce.productName(),
                    description: commerce.productDescription(),
                    images: [image.lorempicsum.image(500, 500, true)],
                    price: random.float({ min: 10, max: 3000 }),
                    category: categories[random.number(categories.length - 1)]._id,
                }).save();
            }
            res("products");
        } catch (err) {
            rej(err);
        }
    });
