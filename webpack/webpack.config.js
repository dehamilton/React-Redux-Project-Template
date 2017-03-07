/* eslint-disable */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
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
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', './src'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        use:
        [
          {
            loader: 'eslint-loader',
            options: { configFile: './.eslintrc.json' }
          }
        ],
        exclude: /node_modules/ },
      { test: /\.(js|jsx)$/, use: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg|gif)$/, use: ['url-loader?limit=8192'] }
    ]
  }
};
