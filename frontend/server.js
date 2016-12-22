const path = require('path');
const express = require('express');
const webpack = require('webpack');
const ecstatic = require('ecstatic');
const config = require('./webpack.config.development');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}));

app.use(require('webpack-hot-middleware')(compiler))

app.get('/app', function (req, res) {
  res.sendFile(path.join(__dirname, './www/app/index.html'));
})
app.get('/admin', function (req, res) {
  res.sendFile(path.join(__dirname, './www/admin/index.html'));
})
app.get('/vendor.js', function (req, res) {
  res.end('')
})
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './www/index.html'));
})

app.listen(process.env.PORT || 80, '0.0.0.0', function (err) {
  if (err) {
    console.log(err);
    return;
  }
});