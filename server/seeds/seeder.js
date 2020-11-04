require("dotenv").config();

const dbConnect = require("../utils/dbConnect");
const userSeeder = require("./users");
const categorySeeder = require("./categories");
const productSeeder = require("./products");

const seeders = [userSeeder(10), categorySeeder(10), productSeeder(10)];

dbConnect().then((con) => {
	Promise.all(seeders)
		.then(() => {
			console.log("Collections were seeded successfully.");
			con.connections[0].close();
		})
		.catch(() => console.log("Something went wrong."));
});
