const config = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'google',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'amalitsky/recommended',
    'amalitsky/imports',
    'amalitsky/naming',
    'amalitsky/newlines',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      ecmaVersion: 2018,
    },
  },
};

module.exports = config;
