var express = require('express');
var app = express();
var http = require('http');
var sqlite3 = require('sqlite3').verbose();
app.set('view engine', 'ejs');
app.use(express.static(__dirname));
http.createServer(app).listen(process.env.PORT || 3000, function () {
  console.log('server running port 3000');
});
app.get('/', function (req, res) {
  res.render('index', {
    name: 'Developer',
    link:'/public/images/avatar.jpg'
  });
});
app.get('/programming/:id', function (req,res) {
  var id = req.params.id;
  var nameTable;
  var param = {};

  switch (id){
    case '1':
      nameTable ='java';
      param.name = 'Java';
      param.link = '/public/images/java.png';
      break;
    case '2':
      nameTable = 'android';
      param.name = 'Android';
      param.link = '/public/images/android.jpg';
      break;
    case '3':
      nameTable = 'nodejs';
      param.name = 'NodeJs';
      param.link = '/public/images/nodejs.jpg';
      break;
    case '4':
      nameTable = 'c';
      param.name = 'C/C++';
      param.link = '/public/images/c.jpg';
      break;
    default:
      res.redirect('/');
      return;
  }
  var  db = new sqlite3.Database('./databases/dulieu.s3db');
  db.all('SELECT title,content FROM ' +nameTable , function (err, rows) {
    param.list = rows;
    res.render('programming/index',param);
    console.log(param.list);
  });

});

app.get('/programming/:idLanguage/:idPost', function (req,res) {
  /// do something
  res.render('programming/post');
});


/*
var  db = new sqlite3.Database('./databases/dulieu.s3db');
db.all('SELECT title,content FROM nodejs', function (err, rows) {
});
db.all('INSERT INTO nodejs (title,content) VALUES (?,?);', 'Event Loop là gì ?', 'Linh');
*/


