/**
 * @fileoverview Disallow shallow rendering components
 * @author Giamir Buoncristiani
 */
'use strict';

const ERROR_MESSAGE = 'Shallow rendering is not allowed. Please prefer Full DOM rendering (mount).';

function getNameFromCjsRequire(init) {
  if (
    init.callee
    && init.callee.name === 'require'
    && init.arguments.length === 1
    && init.arguments[0].type === 'Literal'
  ) {
    return init.arguments[0].value;
  }
  return '';
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Disallow shallow rendering components',
      recommended: true,
      url: 'https://github.com/giamir/eslint-plugin-enzyme/tree/master/docs/rules/no-shallow.md'
    },
    fixable: null,
    schema: []
  },

  create(context) {
    let enzymeIdentifier;

    return {
      ImportDeclaration(node) {
        if (node.source.value === 'enzyme') {
          if (node.specifiers.find(specifier => specifier.imported && specifier.imported.name === 'shallow')) {
            context.report({node, message: ERROR_MESSAGE});
          }
          node.specifiers.forEach(specifier => {
            if (specifier.type === 'ImportDefaultSpecifier') {
              enzymeIdentifier = specifier.local.name;
            }
          });
        }
      },
      VariableDeclarator(node) {
        const name = getNameFromCjsRequire(node.init);
        if (name === 'enzyme') {
          if (node.id.type === 'ObjectPattern') {
            if (node.id.properties.find(property => property.key.name === 'shallow')) {
              context.report({node, message: ERROR_MESSAGE});
            }
          }
          enzymeIdentifier = node.id.name;
        }
      },
      'Identifier:exit'(node) {
        if (
          node.name === 'shallow'
          && node.parent.object
          && node.parent.object.name === enzymeIdentifier
        ) {
          context.report({node, message: ERROR_MESSAGE});
        }
      }
    };
  }
};
