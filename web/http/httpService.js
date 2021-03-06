/**
 * @file HTTP Express App - Core Service
 */

const express = require('express');

let express_app;

/**
 * Initialize Express service
 * @returns {Express object}
 */
const init_express = function() {
  console.log('Initializing Express server');

  try {
    express_app = express();
    console.log(
      'Express server initialize successfully! -- waiting on another module to express app to port'
    );
  } catch (error) {
    console.error(`Error server failed to initialize due to: ${error}`);
    throw error;
  }
};

/**
 * Get Express service
 */
const get_express_app = function() {
  if (express_app === undefined) init_express();

  return express_app;
};

module.exports = get_express_app();
