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
app.get('/book', function (req,res) {
  var nameTable = 'book';
  var param = {};
  param.name = 'Book';
  param.link = '/public/images/book.png';
  var  db = new sqlite3.Database('./databases/dulieu.s3db');
  db.all('SELECT title,_id FROM ' +nameTable , function (err, rows) {
    param.list = rows;
    res.render('book/index',param);
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
      param.language = 1;
      break;
    case '2':
      nameTable = 'android';
      param.name = 'Android';
      param.link = '/public/images/android.jpg';
      param.language = 2;
      break;
    case '3':
      nameTable = 'nodejs';
      param.name = 'NodeJs';
      param.link = '/public/images/nodejs.jpg';
      param.language = 3;
      break;
    case '4':
      nameTable = 'c';
      param.name = 'C/C++';
      param.link = '/public/images/c.jpg';
      param.language = 4;
      break;
    default:
      res.redirect('/');
      return;
  }
  var  db = new sqlite3.Database('./databases/dulieu.s3db');
  db.all('SELECT title,_id FROM ' +nameTable , function (err, rows) {
    param.list = rows;
    res.render('programming/index',param);
  });

});

app.get('/programming/:idLanguage/:idPost', function (req,res) {
  var idLanguage = req.params.idLanguage;
  var idPost = req.params.idPost;
  var nameTable;
  var param = {};
  switch (idLanguage){
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
  db.all('SELECT title,content FROM ' + nameTable+ ' WHERE _id = (?)',idPost , function (err, rows) {
    if(rows.length === 0 ){
      res.redirect('/');
      return;
    }
    param.content = rows[0].content;
    param.title = rows[0].title;
    res.render('programming/post',param);
  });
});
app.use(function (req,res) {
  res.redirect('/');
});


/*
var fs = require('fs');
var x = fs.readFileSync('demo.txt', 'utf8');
console.log(x);
var  db = new sqlite3.Database('./databases/dulieu.s3db');
db.all('SELECT title,content FROM nodejs', function (err, rows) {
});
db.all('INSERT INTO nodejs (title,content) VALUES (?,?);', 'Tạo một server http đơn giản !', x);
*/



/*
var fs = require('fs');
var x =  fs.readFileSync('demo.txt', 'utf8');
console.log(x);
var  db = new sqlite3.Database('./databases/dulieu.s3db');
db.all('UPDATE nodejs SET content = (?) WHERE _id =(?);',x,3);

*/


