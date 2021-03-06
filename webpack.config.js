const path = require('path');
const webpack = require('webpack');
const ModuleReplaceWebpackPlugin = require('module-replace-webpack-plugin');


config = {
  mode: 'development',
  entry: ['@babel/polyfill', 'react-hot-loader/patch', './src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'script.js',
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'react-hot-loader/webpack',
          'babel-loader',
          'ts-loader'
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
          options: {
            sourceMap: true,
          },
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }],
      },
      {
          test: /\.ttf$/,
          use: [
            {
              loader: 'ttf-loader'
            },
          ]
      }
    ]
  },
  devtool: 'eval-source-map',
  watch: true,
  plugins: [
    new ModuleReplaceWebpackPlugin({
      modules: [{
        test: /^tiny-worker$/,
        replace: './src/shims/Worker.js'
      }, {
        test: /^ws$/,
        replace: './src/shims/WebSocket.js'
      }, {
        test: /^wrtc$/,
        replace: './src/shims/wrtc.js'
      }]
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000,
    hot: true
  }
};



module.exports = config;
