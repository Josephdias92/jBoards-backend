/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/stickies', require('./api/sticky'));
  app.use('/api/boards', require('./api/board'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));


};
