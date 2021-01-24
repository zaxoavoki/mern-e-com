require("dotenv").config();

const cors = require("cors");
const express = require("express");
const { sequelize } = require("./models");
// const router = require("./routes");
const { getSequelize } = require("./helpers/database.mysql");

(async () => {
  // await sequelize.sync();

  const app = express();
  const port = process.env.APP_PORT || 4000;

  try {
    await getSequelize().authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  // app.use("/", router);

  app.listen(port, () => console.log(`🚩 Listening at http://localhost:${port}`));
})();
