require("dotenv").config();

const cors = require("cors");
const express = require("express");
const dbConnect = require("./utils/dbConnect");
const router = require("./routes/router");

const app = express();
const port = process.env.APP_PORT || 3000;

dbConnect().then(() => {
	console.log("Connected to MongoDB");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
