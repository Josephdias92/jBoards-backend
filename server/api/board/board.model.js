'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Sticky = mongoose.model('Sticky').schema;

var SectionSchema = new Schema({
  name: String,
  originalName: String,
  color: String,
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board'
  },
  data: [Sticky]
})

var BoardSchema = new Schema({
  name: String,
  description: String,
  active: Boolean,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  private: Boolean,
  type: {
    name: String,
    section: [SectionSchema]
  }
});
module.exports = mongoose.model('Board', BoardSchema);
