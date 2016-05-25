var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SectionSchema = new Schema({
  name: String,
  originalName: String,
  data: Array
});

var BoardSchema = new Schema({
  name: String,
  description: String,
  type: {
    name: String,
    section: [SectionSchema]
  }
});

module.exports = mongoose.model('Board', BoardSchema);
