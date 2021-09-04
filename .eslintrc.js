module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['prettier', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'eol-last': 'error',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
  },
};
