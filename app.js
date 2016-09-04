var express = require('express');
var app = express();
var http = require('http');
app.set('view engine', 'ejs');
app.use(express.static(__dirname));
http.createServer(app).listen(3000, function () {
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
  var param = {};
  switch (id){
    case '1':
      param.name = 'Java';
      param.link = '/public/images/java.png';
      break;
    case '2':
      param.name = 'Android';
      param.link = '/public/images/android.jpg';
      break;
    case '3':
      param.name = 'NodeJs';
      param.link = '/public/images/nodejs.jpg';
      break;
    case '4':
      param.name = 'C/C++';
      param.link = '/public/images/c.jpg';
      break;
    default:
      res.redirect('/');

  }
    res.render('programming/index',param);

});