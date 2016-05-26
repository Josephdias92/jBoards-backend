'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StickySchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Sticky', StickySchema);