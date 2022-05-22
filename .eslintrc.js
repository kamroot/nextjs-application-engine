module.exports = {
  extends: [
    'plugin:prettier/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'next/core-web-vitals',
    'plugin:storybook/recommended',
    // "plugin:tailwindcss/recommended",
    "plugin:react-hooks/recommended"
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['prettier', '@typescript-eslint',  "tailwindcss"],
  rules: {
    'jsx-a11y/href-no-hash': ['off'],
    'no-underscore-dangle': ['off'],
    'react/prop-types': 0,
    'global-require': 0,
    camelcase: 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'prettier/prettier': ['warn', { trailingComma: 'es5', singleQuote: true, printWidth: 120 }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-unresolved': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    // "tailwindcss": {
    //   // These are the default values but feel free to customize
    //   "callees": ["classnames", "clsx", "ctl"],
    //   "config": "tailwind.config.js",
    //   // "groups": defaultGroups, // imported from groups.js
    //   "prependCustom": false,
    //   "removeDuplicates": true,
    //   "whitelist": []
    // },
  },
};
