require("dotenv").config();
const mongoose = require("mongoose");

const connection = {};

module.exports = async function dbConnect() {
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });

    connection.isConnected = db.connections[0].readyState;
    return db;
};
