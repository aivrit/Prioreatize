'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Restaurant = mongoose.model('Restaurant'),
  Category = mongoose.model('Category'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Restaurant
 */
exports.create = function(req, res) {
  var restaurant = new Restaurant(req.body);
  restaurant.user = req.user;

  restaurant.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(restaurant);
    }
  });
};

/**
 * Show the current Restaurant
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var restaurant = req.restaurant ? req.restaurant.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  restaurant.isCurrentUserOwner = req.user && restaurant.user && restaurant.user._id.toString() === req.user._id.toString();

  res.jsonp(restaurant);
};

/**
 * Update a Restaurant
 */
exports.update = function(req, res) {
  var restaurant = req.restaurant;

  restaurant = _.extend(restaurant, req.body);

  restaurant.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(restaurant);
    }
  });
};

/**
 * Delete an Restaurant
 */
exports.delete = function(req, res) {
  var restaurant = req.restaurant;

  restaurant.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(restaurant);
    }
  });
};

/**
 * List of Restaurants
 */

function iterateOnParams(req, res, categories) {
  var rank_names = [];
  for (var categoryName in req.query) {
    if (req.query.hasOwnProperty(categoryName)) {
      // check if it is important or critical
      if (req.query[categoryName] !== 0) {
        for (var i = 0; i < categories.length(); i++) {
          if (categories[i].name == categoryName) {
            rank_names.push(categories[i].rank_name);
            // add another push
          }
         }
      }
    }
  }
}

function findRankNameInCategories(categories){
  for (var i = 0; i < categories.length(); i++) {
    // if (categories[i].name == )
  }
}
function getCategories(req, res) {
  Category.find({}).exec(function(err, categories)
  {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      iterateOnParams(req, res, categories);
  }});
}

exports.list = function(req, res) {

  var complete = []
  Restaurant.find().limit(100).sort('-price_rating').exec(function(err, restaurants) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(restaurants);
    }
  });
};


/**
 * List of Restaurants searched
 */
exports.search = function(req, res) {
  Restaurant.find().limit(100).sort('-created').populate('user', 'displayName').exec(function(err, restaurants) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(restaurants);
    }
  });
};

/**
 * Restaurant middleware
 */
exports.restaurantByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Restaurant is invalid'
    });
  }

  Restaurant.findById(id).populate('user', 'displayName').exec(function (err, restaurant) {
    if (err) {
      return next(err);
    } else if (!restaurant) {
      return res.status(404).send({
        message: 'No Restaurant with that identifier has been found'
      });
    }
    req.restaurant = restaurant;
    next();
  });
};


/**
* Restaurant find by categories
*/
exports.restaurantByCategories = function(req, res, next) {
  Restaurant.find().populate('user', 'displayName').exec(function (err, restaurant) {
    if (err) {
      return next(err);
    } else if (!restaurant) {
      return res.status(404).send({
        message: 'No Restaurant with that identifier has been found'
      });
    }
    req.restaurant = restaurant;
    next();
  });
};
