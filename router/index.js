var router = express.Router();
router.get('*', function (req,res, next) {
    if(req.headers['x-forwarded-proto']!='https') {
        res.redirect('https://whoamiblog.herokuapp.com' + req.url);
    }
    else {
        next();
    }
});
router.get('/', function (req, res) {
    res.render('index', {
        main:'Blog Developer !',
        name: 'Developer',
        link:'/images/avatar.jpg'
    });
});
router.use(express.static('public'));
router.use(express.static('node_modules/jquery'));
router.use(express.static('node_modules/bootstrap'));
router.use('/programming', require('./programming'));
router.use('/book', require('./book'));
router.use(function (req,res) {
    res.redirect('/');
});
module.exports = router;
