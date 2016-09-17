global.express = require('express');
var app = express();
var http = require('http');
global.MongoClient = require('mongodb').MongoClient;
global.ObjectID = require('mongodb').ObjectID;
global.url = 'mongodb://duclinh:namnam@ds021356.mlab.com:21356/datablog';
app.set('view engine', 'ejs');
app.use(require('./router/index'));
http.createServer(app).listen(process.env.PORT || 3000, function () {
  console.log('server running port 3000');
});

http.createServer(function (req,res) {
  console.log('https://'+req.headers.host+':'+(process.env.PORT|| 3000) + req.url);
  res.writeHead(301, {'Location': 'https://'+req.headers.host+':'+(process.env.PORT || 3000) + req.url});
  res.end();
}).listen(80, function () {
  console.log('running port 80');
});
