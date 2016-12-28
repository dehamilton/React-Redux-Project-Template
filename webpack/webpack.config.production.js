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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      '__DEVTOOLS__': false,
      'process.env': { NODE_ENV: JSON.stringify("production") }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.ProvidePlugin({
      'axios': 'axios'
    }),
    new webpack.IgnorePlugin(/regenerator|nodent|js-beautify/, /ajv/)
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'src'],
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(js|jsx)$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'}
    ]
  }
};
