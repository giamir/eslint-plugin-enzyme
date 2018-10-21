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

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('no-shallow', rule, {

  valid: [
    {
      code: 'const wrapper = mount(<Component />);'
    }
  ],

  invalid: [
    {
      code: 'shallow(<Component />);',
      errors: [
        {
          message: 'Shallow rendering is not allowed. Please prefer Full DOM rendering (mount).'
        }
      ]
    },
    {
      code: `
        const wrapper = shallow(<Component />);
        const secondWrapper = shallow(<Component />);
      `,
      errors: [
        {
          message: 'Shallow rendering is not allowed. Please prefer Full DOM rendering (mount).'
        },
        {
          message: 'Shallow rendering is not allowed. Please prefer Full DOM rendering (mount).'
        }
      ]
    }
  ]
});
