var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, './build/bundle.js'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      '__DEVTOOLS__': true,
      'process.env': JSON.stringify('development')
    }),
    new webpack.ProvidePlugin({
      'axios': 'axios'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  eslint: {
    configFile: './.eslintrc.json'
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loaders: ['babel', 'eslint-loader'], exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  progress: true
};
