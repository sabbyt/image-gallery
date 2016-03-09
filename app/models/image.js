const mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
  link: String,
  description: String
});

module.exports = exports = mongoose.model('Image', imageSchema);
