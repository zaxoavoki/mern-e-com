require("dotenv").config();

const cors = require("cors");
const express = require("express");
const router = require("./routes/router");
const { connect } = require("./utils/database");

(async () => {
  const app = express();
  const port = process.env.APP_PORT || 4000;

  await connect();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/", router);

  app.listen(port, () => console.log(`🚩 Listening at http://localhost:${port}`));
})();
