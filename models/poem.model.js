const mongoose = require('mongoose');

const poemScheme = mongoose.Schema({
  name: String,
  content: String,
  tags: [],
  author: String,
  date: Date,
  url: String
})

let Poem = mongoose.model('Poem', poemScheme);

module.exports = Poem;