# Disallow shallow rendering components (no-shallow)

The user should prefer Full DOM rendering over shallow rendering your application.

> With shallow rendering, I can refactor my component’s implementation and my tests break. With shallow rendering, I can break my application and my tests say everything’s still working.<br><br>
Kent C. Dodds

More information:
[Why I Never Use Shallow Rendering](https://blog.kentcdodds.com/why-i-never-use-shallow-rendering-c08851a68bb7) by Kent C. Dodds

## Rule Details

The following patterns are considered warnings:

```jsx
import { shallow } from 'enzyme';

const { shallow } =  require('enzyme');

import enzyme from 'enzyme';
enzyme.shallow(<Component />);

const enzyme = require('enzyme');
enzyme.shallow(<Component />)
```

The following patterns are **not** considered warnings:

```jsx
import { mount } from 'enzyme';

import enzyme from 'enzyme';

const { mount } = require('enzyme');

const enzyme = require('enzyme');
```
