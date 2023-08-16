module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard', 'plugin:react/recommended', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'warn',
    camelcase: 'off',
    'no-useless-computed-key': 'warn',
    eqeqeq: 'warn',
  },
};
