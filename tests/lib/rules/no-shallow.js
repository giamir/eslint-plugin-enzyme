/**
 * @fileoverview disallow shallow rendering components
 * @author Giamir Buoncristiani
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-shallow');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

const ERROR_MESSAGE = 'Shallow rendering is not allowed. Please prefer Full DOM rendering (mount).';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const VALID_PATTERNS = [
  'const shallow = { key: \'value\' };',
  'import { mount } from \'enzyme\';',
  'const { mount } = require(\'enzyme\');',
  'import enzyme from \'enzyme\';',
  'const enzyme = require(\'enzyme\');'
];

const INVALID_PATTERNS = [
  'import { shallow } from \'enzyme\';',
  'import { mount, shallow } from \'enzyme\';',
  'const { shallow } = require(\'enzyme\');',
  'const { mount, shallow } = require(\'enzyme\');',
  'import enzyme from \'enzyme\'; enzyme.shallow();',
  'const enzyme = require(\'enzyme\'); enzyme.shallow();'
];

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('no-shallow', rule, {

  valid: VALID_PATTERNS.map(pattern => ({code: pattern})),

  invalid: INVALID_PATTERNS.map(pattern => ({
    code: pattern,
    errors: [{message: ERROR_MESSAGE}]
  }))
});
