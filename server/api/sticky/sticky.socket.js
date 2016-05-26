/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Sticky = require('./sticky.model');

exports.register = function(socket) {
  Sticky.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Sticky.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('sticky:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('sticky:remove', doc);
}