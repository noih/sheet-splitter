const ESLintPlugin = require('eslint-webpack-plugin');
const CracoLessPlugin = require('craco-less');

module.exports = {
  reactScriptsVersion: 'react-scripts',
  eslint: {
    enable: false
  },
  babel: {
    presets: [
    ],
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true
        }
      ]
    ],
    loaderOptions: (babelLoaderOptions, { env, paths }) => babelLoaderOptions
  },
  webpack: {
    alias: {},
    plugins: {
      add: [
        new ESLintPlugin({
          extensions: ['js', 'jsx'],
          failOnError: false,
          emitWarning: true
        })
      ],
      remove: []
    },
    configure: (webpackConfig, { env, paths }) => {
      return {
        ...webpackConfig,
        resolve: {
          ...webpackConfig.resolve,
          fallback: {
            fs: false,
            child_process: false,
            tls: false,
            url: false,
            http: false,
            https: false,
            net: false,
            zlib: false,
            buffer: false,
            bufferutil: false,
            stream: false,
            crypto: false,
            path: false,
            'utf-8-validate': false,
            'stream-http': false
          }
        }
      };
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#1890ff'
            },
            javascriptEnabled: true
          }
        }
      }
    },
    {
      plugin: 'transform-remove-console'
    }
  ]
};
