/**
 * @fileoverview Eslint rules for enzyme - JS testing utilites library for React
 * @author Giamir Buoncristiani
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const requireIndex = require('requireindex');

// ------------------------------------------------------------------------------
// Plugin Definition
// ------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(`${__dirname}/rules`);


module.exports.environments = {
  globals: {
    globals: {
      shallow: false,
      mount: false,
      render: false
    }
  }
}
