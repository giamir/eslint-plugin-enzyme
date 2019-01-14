# Allow to find node exclusively by CSS selectors (only-find-by-css-selectors)

The user should prefer CSS selectors over Component constructors, Component's displayName, Prop selectors and Object Property Selector.

> Often in tests using enzyme, to find the “LoadGreeting” button you might use find by component displayName or the component constructor. But when the user wants to load the greeting, they don't care about those **implementation details**, instead they're going to find and click the button that says "Load Greeting."<br><br>
Kent C. Dodds

More information:
[Introducing the react testing library](https://blog.kentcdodds.com/introducing-the-react-testing-library-e3a274307e65) by Kent C. Dodds

## Rule Details

The following patterns are considered warnings:

```jsx
import { mount } from 'enzyme';
import MyButton from './MyButton';

const wrapper = mount(
  <div>
    <MyButton size="big">my button</MyButton>
  </div>
);

wrapper.find(MyButton); // Component constructor
wrapper.find('MyButton'); // Component's displayName
wrapper.find('[size="big"]'); // Prop selector
wrapper.find({ size: 'big' }); // Object property selector
```

The following patterns are **not** considered warnings:

```jsx
import { mount } from 'enzyme';

const id = 'anchor';
const className = "anchor";

const wrapper = mount(
  <div>
    <a id={id} className={className} href="#anchor">my link</a>
  </div>
);

wrapper.find('a');
wrapper.find(`#${id}`)
wrapper.find('#anchor');
wrapper.find(`.${className}`)
wrapper.find('.anchor');
wrapper.find('a[href="#anchor"]');
```
