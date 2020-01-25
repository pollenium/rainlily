const path = require('path');

config = {
  mode: 'production',
  entry: ['@babel/polyfill', './src/index.ts'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'script.js',
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
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
    ],
  },
  mode: 'development',
  devtool: 'eval-source-map',
  watch: true
};



module.exports = config;
