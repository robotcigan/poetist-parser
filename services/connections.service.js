const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/poetist');

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('db was opened');
});