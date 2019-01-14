/**
 * @fileoverview Only allow find by css selectors
 * @author Giamir Buoncristiani
 */
'use strict';

const fs = require('fs');
const moduleVisitor = require('eslint-module-utils/moduleVisitor').default;
const resolve = require('eslint-module-utils/resolve').default;
const parse = require('eslint-module-utils/parse').default;

const ERROR_MESSAGE = 'Error!!!';

function isLiteralValid(literalValue) {
  const VALID_LITERAL_REGEXP = /^([a-z]|\.|#)/g;
  return VALID_LITERAL_REGEXP.test(literalValue);
}

function checkLiteral(literalNode, context) {
  if (!isLiteralValid(literalNode.value)) {
    return context.report({
      node: literalNode,
      message: 'IT IS NOT A VALID LITERAL'
    });
  }
}

function getNameFromCjsRequire(init) {
  if (
    init
    && init.callee
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
      description: 'Only allow find by css selectors',
      recommended: true,
      url: 'https://github.com/giamir/eslint-plugin-enzyme/tree/master/docs/rules/only-find-by-css-selectors.md'
    },
    fixable: null,
    schema: []
  },

  create: function (context) {
    const enzymeWrappers = [];
    const allIdentifiers = [];
    const allParsedModules = {};

    // this function reads and parses an external module
    function checkSourceValue(source) {
      console.log('PARSING MODULE: ', source.value);
      const resolvedPath = resolve(source.value, context);
      if (resolvedPath) {
        const content = fs.readFileSync(resolvedPath, {encoding: 'utf8'});
        const parsedModule = parse(resolvedPath, content, context);
        allParsedModules[source.value] = parsedModule;
      }
    }
    const moduleVisitorObj = moduleVisitor(checkSourceValue);

    return Object.assign({
      CallExpression(node, ...args) {
        // this is a naive if statement
        // (check that this Identifiers are actually coming from the enzyme library - this logic could be extracted and reused in no-shallow rule?)
        // we should also check for find here or really anything that can return an enzymeWrapper
        if (node.callee.name === 'mount' || node.callee.name === 'shallow') {
          // instead of using just a string can we actually store the entire `node.parent` ?
          enzymeWrappers.push(node.parent.id.name);
        }

        moduleVisitorObj.CallExpression && moduleVisitorObj.CallExpression(node, ...args);
      },
      Identifier(node) {
        allIdentifiers.push(node);
      },
      'CallExpression:exit'(node) {
        if (node.callee.type === 'MemberExpression'
        && node.callee.property.name === 'find'
        && enzymeWrappers.includes(node.callee.object.name)) {
          const typeOfArgumentInFind = node.arguments[0].type;

          console.log('TYPE OF ARGUMENT IN FIND: ', typeOfArgumentInFind);

          if (typeOfArgumentInFind === 'Literal') {
            return checkLiteral(node.arguments[0], context);
          }

          if (typeOfArgumentInFind === 'Identifier') {
            const identifier = allIdentifiers.find(identifier => identifier.name === node.arguments[0].name);

            let importedModule, importedModuleParsed;

            if (identifier.parent.type === 'ImportDefaultSpecifier') {
              importedModule = identifier.parent.parent.source.value;
            }

            if (identifier.parent.type === 'VariableDeclarator') {
              importedModule = getNameFromCjsRequire(identifier.parent.init);
              if (!importedModule) {
                const valueAssignedToVariableNode = identifier.parent.init;

                if (valueAssignedToVariableNode.type === 'Literal') {
                  return checkLiteral(valueAssignedToVariableNode.value[0], context);
                }
              }
            }

            console.log('IT IS A MODULE, the source is: ', importedModule);
            importedModuleParsed = allParsedModules[importedModule];
            // we need to check here if the module exported value is a literal or a identifier (check continues) or anything else (check fails)
          }

          context.report({node: node.arguments[0], message: 'IT IS A FUNCTION OR AN OBJECT'});

          // if it is a literal
          // check for all the html native elements
          // check for the . [(watch out for prop selector) or # at the beginning of the string

          // CASE MISSING!
          // TEMPLATE LITERALS ``

          // if it is an Identifier (module or assignment)
          // check what it contains and reapply the rule above

          // fail otherwise

          // checkout enzyme selectors here:
          // https://airbnb.io/enzyme/docs/api/selector.html
        }
      }
    }, moduleVisitorObj);
  }
};
