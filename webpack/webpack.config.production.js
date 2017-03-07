var path = require('path');
var webpack = require('webpack');
var package = require('../package.json');

module.exports = {
  devtool: 'source-map',
  entry: [
    'es5-shim',
    'es5-shim/es5-sham',
    './src/_utils/shims',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, '../build/'),
    filename: 'bundle_' + package.version + '.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEVTOOLS__': false,
      'process.env': { NODE_ENV: JSON.stringify("production") }
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.ProvidePlugin({
      'axios': 'axios'
    }),
    new webpack.IgnorePlugin(/regenerator|nodent|js-beautify/, /ajv/)
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', './src'],
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, use: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg|gif)$/, use: ['url-loader?limit=8192'] }
    ]
  }
};
