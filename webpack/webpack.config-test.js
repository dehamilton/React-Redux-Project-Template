var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
 
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      '__DEVTOOLS__': false,
      'process.env': JSON.stringify('testing')
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'src'],
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loaders: ['babel'] },
    ],
  },
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
};
