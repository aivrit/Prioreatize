'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Restaurant Schema
 */
var RestaurantSchema = new Schema({
  _id: {
    type: Schema.ObjectId
  },
  name: {
    type: String,
    default: '',
    required: 'Please fill Restaurant name',
    trim: true
  },
  romantic_rating: {
    type: String
  },
  clean_rating: {
    type: String
  },
  good_for_meat_rating: {
    type: String
  },
  good_for_vegeterian_rating: {
    type: String
  },
  price_rating: {
    type: String
  },
  big_dish_rating: {
    type: String
  },
  service_rating: {
    type: String
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Restaurant', RestaurantSchema);
