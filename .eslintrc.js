module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
		"indent": [ "error", "tab" ],
		"linebreak-style": [ "error", "unix" ],
		"quotes": [ "error", "double" ],
		"semi": [ "error", "always" ],
		"array-bracket-spacing": [ "error", "always", { "objectsInArrays": false, "arraysInArrays": false }],
		"object-curly-spacing": [ "error", "always", { "objectsInObjects": false, "arraysInObjects": false }],
		"space-in-parens": ["error", "always", { "exceptions": ["{}", "()", "[]"] }],
		"computed-property-spacing": [ "error", "always" ],
        "comma-dangle": [ "error", "always-multiline" ],
        "prefer-const": "error",
		"prefer-spread": "error",
        "func-call-spacing": [ "error", "never" ],
		"no-loop-func": "error"
    }
};