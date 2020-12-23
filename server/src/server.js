require("dotenv").config();

const cors = require("cors");
const express = require("express");
const router = require("./routes");
const { connect } = require("./helpers/database");

(async () => {
  const app = express();
  const port = process.env.APP_PORT || 4000;

  await connect({ uri: process.env.MONGODB_URI, name: process.env.MONGODB_NAME });

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/", router);

  app.listen(port, () => console.log(`🚩 Listening at http://localhost:${port}`));
})();
