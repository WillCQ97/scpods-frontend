export default [
  {
    root: true,
    env: {
      browser: true,
      node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
    },
    extends: [
      '@nuxtjs/eslint-config-typescript',
      'plugin:prettier/recommended',
    ],
    // add your custom rules here
    rules: {
      'linebreak-style': 'off',
    },
  },
]
