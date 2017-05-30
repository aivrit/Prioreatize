'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Packagep = mongoose.model('Packagep'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Packagep
 */
exports.create = function(req, res) {
  var packagep = new Packagep(req.body);
  packagep.user = req.user;

  packagep.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(packagep);
    }
  });
};

/**
 * Show the current Packagep
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var packagep = req.packagep ? req.packagep.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  packagep.isCurrentUserOwner = req.user && packagep.user && packagep.user._id.toString() === req.user._id.toString();

  res.jsonp(packagep);
};

/**
 * Update a Packagep
 */
exports.update = function(req, res) {
  var packagep = req.packagep;

  packagep = _.extend(packagep, req.body);

  packagep.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(packagep);
    }
  });
};

/**
 * Delete an Packagep
 */
exports.delete = function(req, res) {
  var packagep = req.packagep;

  packagep.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(packagep);
    }
  });
};

/**
 * List of Packageps
 */
exports.list = function(req, res) {
  Packagep.find().sort('-created').populate('user', 'displayName').exec(function(err, packageps) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(packageps);
    }
  });
};

/**
 * Packagep middleware
 */
exports.packagepByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Packagep is invalid'
    });
  }

  Packagep.findById(id).populate('user', 'displayName').exec(function (err, packagep) {
    if (err) {
      return next(err);
    } else if (!packagep) {
      return res.status(404).send({
        message: 'No Packagep with that identifier has been found'
      });
    }
    req.packagep = packagep;
    next();
  });
};
