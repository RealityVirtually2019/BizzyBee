module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['vue'],
  extends: ['plugin:vue/recommended', '@vue/prettier'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',

    'no-unused-vars': 'off',

    'comma-dangle': ['warn', 'only-multiline'],

    'prettier/prettier': [
      'warn',
      {
        trailingComma: 'es5',
        singleQuote: true,
        semi: false,
      },
    ],

    'vue/html-indent': ['warn', 2],
    'vue/html-self-closing': 'off',

    'vue/no-use-v-if-with-v-for': 'off',
    'vue/no-unused-components': 'off',

    'vue/attributes-order': 'error',
    'vue/order-in-components': 'error',
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 5,
        multiline: {
          max: 3,
          allowFirstLine: true,
        },
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
  },
  globals: {
    THREE: true,
  },
}
