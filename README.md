# eslint-plugin-enzyme

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

## Supported Rules

* [enzyme/no-shallow](docs/rules/no-shallow.md)

# License

eslint-plugin-enzyme is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).





