require("dotenv").config();

const dbConnect = require("../utils/dbConnect");

// Seeders
const seeders = [
    { seeder: require("./users"), count: 10 },
    { seeder: require("./categories"), count: 8 },
    { seeder: require("./products"), count: 50 },
    { seeder: require("./transactions"), count: 30 },
    { seeder: require("./comments"), count: 15 },
    { seeder: require("./rating"), count: 8 },
    { seeder: require("./saved"), count: 12 },
];

(async (seeders) => {
    const con = await dbConnect();
    try {
        for (const seeder of seeders) {
            console.log(
                `Seeded ${seeder.count} docs in ${await seeder.seeder(seeder.count)} collection`
            );
        }
        console.log("Collections were seeded successfully ✅");
    } catch (e) {
        console.log("Something went wrong. Try again. ❌");
    } finally {
        con.connections[0].close();
    }
})(seeders);
