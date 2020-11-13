require("dotenv").config();

const dbConnect = require("../utils/dbConnect");
const userSeeder = require("./users");
const categorySeeder = require("./categories");
const productSeeder = require("./products");

const seeders = [userSeeder(10), categorySeeder(10), productSeeder(10)];

(async (seeders) => {
    const con = await dbConnect();
    try {
        for (const seeder of seeders) {
            await seeder;
        }
    } catch (e) {
        console.log(e, "Something went wrong. Try again.");
        process.exit(-1);
    }
    console.log("Collections were seeded successfully.");
    con.connections[0].close();
})(seeders);
