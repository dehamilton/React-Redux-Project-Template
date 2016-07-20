var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, '../build/'),
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
    }),
    new webpack.IgnorePlugin(/regenerator|nodent|js-beautify/, /ajv/)
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'src'],
  },
  eslint: {
    configFile: './.eslintrc.json'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(js|jsx)$/, loaders: ['babel', 'eslint-loader'], exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  progress: true
};
