# eslint-plugin-enzyme
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][deps-image]][deps-url] [![Maintenance Status][status-image]][status-url] 

Eslint rules for enzyme - JS testing utilites library for React

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-enzyme`:

```
$ npm i eslint-plugin-enzyme --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-enzyme` globally.

## Usage

Add `enzyme` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "enzyme"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "enzyme/no-shallow": 2
    }
}
```


You can also use the `enzyme/globals` environment if you are injecting `shallow`, `mount`, and `render` into the global scope: (for example if you are using [`jest-environment-enzyme`](https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-environment-enzyme)) 
```json
{
    "env": {
        "enzyme/globals": true
    }
}

```
## Supported Rules

* [enzyme/no-shallow](docs/rules/no-shallow.md)

# License

eslint-plugin-enzyme is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).


[npm-url]: https://npmjs.org/package/eslint-plugin-enzyme
[npm-image]: https://img.shields.io/npm/v/eslint-plugin-enzyme.svg
[travis-url]: https://travis-ci.org/giamir/eslint-plugin-enzyme
[travis-image]: https://travis-ci.org/giamir/eslint-plugin-enzyme.svg?branch=master
[deps-url]: https://david-dm.org/giamir/eslint-plugin-enzyme
[deps-image]: https://img.shields.io/david/giamir/eslint-plugin-enzyme.svg
[status-url]: https://github.com/giamir/eslint-plugin-enzyme/pulse
[status-image]: https://img.shields.io/github/last-commit/giamir/eslint-plugin-enzyme.svg


