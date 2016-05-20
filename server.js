var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');

var fs = require('fs');
var https = require('https');

var options = {
      key: fs.readFileSync('./key.pem', 'utf8'),
      cert: fs.readFileSync('./server.crt', 'utf8')
   };

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('lib'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

https.createServer(options, app).listen(3002, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  
  console.log('Listening at https://localhost:3002');
});