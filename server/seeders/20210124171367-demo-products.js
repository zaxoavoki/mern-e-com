const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    for (let i = 0; i < 20; i++) {
      await queryInterface.bulkInsert(
        "products",
        [
          {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: Math.floor(Math.random() * 10000) / 100,
            image: faker.image.image(),
            categoryId: Math.floor(Math.random() * 7) + 1,
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("products", null, {});
  },
};
