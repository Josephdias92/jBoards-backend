'use strict';

var _ = require('lodash');
var Board = require('./board.model');

// Get list of boards
exports.index = function(req, res) {
  Board.find(function (err, boards) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(boards);
  });
};

// Get a single board
exports.show = function(req, res) {
  Board.findById(req.params.id, function (err, board) {
    if(err) { return handleError(res, err); }
    if(!board) { return res.status(404).send('Not Found'); }
    return res.json(board);
  });
};

// Creates a new board in the DB.
exports.create = function(req, res) {
  Board.create(req.body, function(err, board) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(board);
  });
};

// Updates an existing board in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Board.findById(req.params.id, function (err, board) {
    if (err) { return handleError(res, err); }
    if(!board) { return res.status(404).send('Not Found'); }
    var updated = _.merge(board, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(board);
    });
  });
};

// Deletes a board from the DB.
exports.destroy = function(req, res) {
  Board.findById(req.params.id, function (err, board) {
    if(err) { return handleError(res, err); }
    if(!board) { return res.status(404).send('Not Found'); }
    board.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}