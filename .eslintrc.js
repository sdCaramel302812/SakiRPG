module.exports = {
  "parser": "babel-eslint",
  "env": {
    "es6": true,
    "node": true,
    "mocha": true
  },
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "max-len": [2, {
      "code": 120,
      "tabWidth": 2,
      "ignoreUrls": true,
      "ignoreComments": true,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true,
    }],
  }
};