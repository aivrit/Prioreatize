'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Packagep Schema
 */
var PackagepSchema = new Schema({
  name: {
    type: String
  },
  priorities: {
    type: []
  }
});

mongoose.model('Packagep', PackagepSchema);
