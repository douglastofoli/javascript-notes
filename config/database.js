const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO } = process.env;

mongoose.Promise = global.Promise;

mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('Connection succesful');
}).catch((err) => {
  console.log(err);
});