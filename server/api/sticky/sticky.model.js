'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StickySchema = new Schema({
  name: String,
  originalName: String,
  active: Boolean,
  data: Array
});

module.exports = mongoose.model('Sticky', StickySchema);
