module.exports = {
    "env": {
      "es6": true,
      "node": true,
      "mocha": true
    },
    "extends": ["eslint:recommended", "google"],
    "plugins": ["jsdoc"],
    "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module"
    },
    "rules": {
      "max-len": [2, {
        "code": 80,
        "tabWidth": 2,
        "ignoreUrls": true,
        "ignoreComments": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
      }],
      "require-jsdoc": 1,
      "valid-jsdoc": 0,
      "jsdoc/check-alignment": 1,
      "jsdoc/check-param-names": 1,
      "jsdoc/check-syntax": 1,
      "jsdoc/check-tag-names": 1,
      "jsdoc/check-types": 1,
      "jsdoc/no-undefined-types": 1,
      "jsdoc/require-hyphen-before-param-description": 1,
      "jsdoc/require-param": 1,
      "jsdoc/require-param-description": 1,
      "jsdoc/require-param-name": 1,
      "jsdoc/require-param-type": 1,
      "jsdoc/require-returns": 1,
      "jsdoc/require-returns-check": 1,
      "jsdoc/require-returns-description": 1,
      "jsdoc/require-returns-type": 1,
      "jsdoc/valid-types": 1
    }
  };