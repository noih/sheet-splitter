module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'react-app',
    'react-app/jest',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb'
  ],
  plugins: [
    'react',
    'react-hooks'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      module: true,
      legacyDecorators: true
    },
    ecmaVersion: 12,
    sourceType: 'module',
    useJSXTextNode: false,
    requireConfigFile: false,
    babelOptions: {
      presets: [
        '@babel/preset-react'
      ],
      plugins: [
        [
          '@babel/plugin-proposal-decorators',
          {
            legacy: true
          }
        ]
      ]
    }
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['src', './src']
        ],
        extensions: ['.js', '.jsx']
      }
    },
    react: {
      version: 'detect'
    }
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/destructuring-assignment': [0, 'never'],
    'no-unused-vars': 'off',
    'padded-blocks': ['off', 'never'],
    'import/no-extraneous-dependencies': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-use-before-define': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'warn',
    'no-console': 'off',
    'no-confusing-arrow': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-underscore-dangle': 'off',
    'react/forbid-prop-types': 'off',
    'no-multiple-empty-lines': 'off',
    'class-methods-use-this': 'off',
    'arrow-body-style': 'off',
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'react/require-default-props': 'warn',
    'react/no-unused-prop-types': 'warn',
    'import/no-unresolved': [2, { caseSensitive: true }],
    'operator-linebreak': ['error', 'before'],
    'prefer-destructuring': 'off',
    'react/sort-comp': 'off',
    'lines-between-class-members': 'off',
    'no-useless-constructor': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'object-curly-newline': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/static-property-placement': 'off',
    'react/prefer-stateless-function': 'off'
  }
};
