'use strict';

var _ = require('lodash');
var Sticky = require('./sticky.model');

// Get list of stickys
exports.index = function(req, res) {
  Sticky.find(function(err, stickys) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(stickys);
  });
};

// Get a single sticky
exports.show = function(req, res) {
  Sticky.findById(req.params.id,'-userId', function(err, sticky) {
    if (err) {
      return handleError(res, err);
    }
    if (!sticky) {
      return res.status(404).send('Not Found');
    }
    return res.json(sticky);
  });
};

// Creates a new sticky in the DB.
exports.create = function(req, res) {
  var sticky = new Sticky(req.body);
  sticky.userId = req.user._id;
  Sticky.create(sticky, function(err, sticky) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(sticky);
  });
};

// Updates an existing sticky in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Sticky.findById(req.params.id, function(err, sticky) {
    if (err) {
      return handleError(res, err);
    }
    if (!sticky) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(sticky, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(sticky);
    });
  });
};

// Deletes a sticky from the DB.
exports.destroy = function(req, res) {
  Sticky.findById(req.params.id, function(err, sticky) {
    if (err) {
      return handleError(res, err);
    }
    if (!sticky) {
      return res.status(404).send('Not Found');
    }
    sticky.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
