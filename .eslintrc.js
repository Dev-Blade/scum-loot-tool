module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'standard-with-typescript',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-extra-semi': 'off',
    'comma-dangle': 'on',
    'consistent-type-exports': 'off',
  },
};
