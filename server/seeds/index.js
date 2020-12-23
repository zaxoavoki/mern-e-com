const dotenv = require("dotenv");
const { connect, disconnect } = require("../src/helpers/database");

dotenv.config();

const seeders = [
  { seeder: require("./category.seeder"), count: 8, name: "categories" },
  { seeder: require("./product.seeder"), count: 50, name: "products" },
  { seeder: require("./user.seeder"), count: 10, name: "users" },
  { seeder: require("./saved.seeder"), count: 10, name: "saved" },
  { seeder: require("./transaction.seeder"), count: 70, name: "transactions" },
  { seeder: require("./comment.seeder"), count: 15, name: "comments" },
  { seeder: require("./rating.seeder"), count: 30, name: "ratings" },
];

(async () => {
  try {
    await connect({ uri: process.env.MONGODB_URI, name: process.env.MONGODB_NAME });

    for (const seeder of seeders) {
      await seeder.seeder({ count: seeder.count });
      console.log(`🌱 Seeded ${seeder.name} collection`);
    }

    console.log("Collections were seeded successfully ✅");
  } catch (e) {
    console.log(e, "Something went wrong. Try again. ❌");
  } finally {
    await disconnect();
  }
})();
