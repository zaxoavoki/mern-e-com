const mongoose = require("mongoose");

async function connect({ uri, name }) {
  await mongoose.connect(`${uri}/${name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
}

async function disconnect() {
  await mongoose.disconnect();
}

module.exports = { connect, disconnect };
