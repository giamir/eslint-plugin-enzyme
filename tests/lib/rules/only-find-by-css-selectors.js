/**
 * @fileoverview Only allow find by css selectors
 * @author Giamir Buoncristiani
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const path = require('path');
const rule = require('../../../lib/rules/only-find-by-css-selectors');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

const ERROR_MESSAGE = 'Error!!!';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const VALID_PATTERNS = [
  `import { mount } from 'enzyme';

  const id = 'anchor';
  const className = 'anchor';

  const wrapper = mount(
    <div>
      <a id={id} className={className} href="#anchor">my link</a>
    </div>
  );

  wrapper.find('a');
  wrapper.find(\`#\$\{id\}\`);
  wrapper.find('#anchor');
  wrapper.find(\`.\$\{className\}\`);
  wrapper.find('.anchor');
  wrapper.find('a[href="#anchor"]');`
];

// const INVALID_PATTERNS = [
//   `import { mount } from 'enzyme';
//   import MyButton from './MyButton';

//   const wrapper = mount(
//     <div>
//       <MyButton />
//     </div>
//   );

//   wrapper.find(MyButton);`
// ];

const INVALID_PATTERNS = [
  // Component's displayName
  `import { mount } from 'enzyme';
  import MyButton from './MyButton';

  const wrapper = mount(
    <div>
      <MyButton size="big">my button</MyButton>
    </div>
  );

  wrapper.find('MyButton');`,

  // Prop selector
  `import { mount } from 'enzyme';
  import MyButton from './MyButton';

  const wrapper = mount(
    <div>
      <MyButton size="big">my button</MyButton>
    </div>
  );

  wrapper.find('[size="big"]');`,

  // Object property selector
  `import { mount } from 'enzyme';
  import MyButton from './MyButton';

  const wrapper = mount(
    <div>
      <MyButton size="big">my button</MyButton>
    </div>
  );

  wrapper.find({ size: 'big' });`
];

// test should be run with the node and webpack resolvers
// (at the moment they are only run with node "default behavior")

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('only-find-by-css-selectors', rule, {

  valid: VALID_PATTERNS.map(pattern => (
    {
      filename: path.join(process.cwd(), './tests/files/any'),
      code: pattern
    }
  )),

  invalid: INVALID_PATTERNS.map(pattern => ({
    filename: path.join(process.cwd(), './tests/files/any'),
    code: pattern,
    errors: [{severity: 1}]
  }))
});
