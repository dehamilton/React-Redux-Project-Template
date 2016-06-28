var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('../webpack/webpack.config');

var fs = require('fs');
var https = require('https');

var options = {
  key: fs.readFileSync('./server/key.pem', 'utf8'),
  cert: fs.readFileSync('./server/server.crt', 'utf8'),
};

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  quiet: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config.output.publicPath,
  stats: { colors: true },
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('lib'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

https.createServer(options, app).listen(3002, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.info('==> 🚧  Webpack development server listening https://localhost:3002');
});