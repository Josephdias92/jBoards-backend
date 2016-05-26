/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var Sticky = require('../api/sticky/sticky.model');
var Board = require('../api/board/board.model');
var User = require('../api/user/user.model');

// Insert seed data below
var stickySeed = require('../api/sticky/sticky.seed.json');
var boardSeed = require('../api/board/board.seed.json');

// Insert seed inserts below
Sticky.find({}).remove(function() {
	Sticky.create(stickySeed);
});

Board.find({}).remove(function() {
	Board.create(boardSeed);
});

