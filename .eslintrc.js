module.exports = {
  ignorePatterns: ['.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:prettier/recommended',
    'prettier',
    'eslint:recommended'
  ],
  plugins: [
    '@typescript-eslint',
    'simple-import-sort'
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-var': 'error',
    semi: ['error', 'always'],
    'no-multi-spaces': 'error',
    'space-in-parens': 'error',
    'no-multiple-empty-lines': 'error',
    'prefer-const': 'error',
    "simple-import-sort/imports": "error",
  },
};

  