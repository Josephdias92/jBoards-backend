'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StickySchema = new Schema({
  active: Boolean,
  board: { type: Schema.Types.ObjectId, ref: 'Board' },
  section:{type:Schema.Types.ObjectId,ref:'section'},
  text:String
});

module.exports = mongoose.model('Sticky', StickySchema);
