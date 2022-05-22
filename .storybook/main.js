const path = require('path')

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: 'storybook-addon-next',
      options: {
        nextConfigPath: path.resolve(__dirname, '../next.config.js')
      }
    }
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },
  // webpackFinal: async (config) => {
  //   config.module.rules.push({
  //     test: /\.css$/,
  //     use: [
  //       {
  //         loader: 'postcss-loader',
  //         options: {
  //           // ident: 'postcss',
  //           // plugins: [
  //           //   require('tailwindcss'),
  //           //   require('autoprefixer'),
  //           // ],
  //         },
  //       },
  //     ],
  //     include: path.resolve(__dirname, '../'),
  //   })
  //   return config
  // },
}