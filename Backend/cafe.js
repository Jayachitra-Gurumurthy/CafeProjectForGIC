const mongoose = require('mongoose');

const cafeSchema = new mongoose.Schema({
  Name: String,
  Description: String,
  Location: String
});

const Cafe = mongoose.model('Cafe', cafeSchema);

module.exports = Cafe;