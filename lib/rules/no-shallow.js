/**
 * @fileoverview Disallow shallow rendering components
 * @author Giamir Buoncristiani
 */
'use strict';

// const NEVER = 'never';
const NEVER_MESSAGE = 'Shallow rendering is not allowed. Please prefer Full DOM rendering (mount).';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Disallow shallow rendering components',
      category: 'Fill me in',
      recommended: false
    },
    fixable: null,
    schema: [
      // fill in your schema
    ]
  },

  create(context) {
    // const configuration = context.options[0] || NEVER;
    // const configObject = context.options[1] || {};

    const shallowUsages = [];
    return {
      Identifier(node) {
        if (node.name !== 'shallow') {
          return;
        }
        shallowUsages.push(node);
      },
      'Program:exit'() {
        shallowUsages.forEach(node => {
          context.report({
            node: node,
            message: NEVER_MESSAGE
          });
        });
      }
    };
  }
};
