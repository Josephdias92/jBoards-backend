'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Sticky = mongoose.model('Sticky').schema;

var BoardSchema = new Schema({
  name: String,
  description: String,
  active: Boolean,
  type: {
    name: String,
    section: [Sticky]
  }
});

module.exports = mongoose.model('Board', BoardSchema);
