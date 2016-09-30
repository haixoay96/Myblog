var router = express.Router();
router.get('/', function (req,res) {
    var nameTable = 'book';
    var param = {};
    param.main = "I'm Book !";
    param.name = 'Book';
    param.link = '/images/book.png';
    MongoClient.connect(url, function (err, db) {
        if(err){
            res.redirect('/');
            return;
        }
        var collection = db.collection(nameTable);
        try {
            collection.find({},{title:1, _id:1}).toArray(function (err, docs) {
                param.list = docs;
                res.render('programming/index',param);
            });
        }catch (err){
            res.redirect('/');
        }
        finally {
            db.close();
        }
    });
});
module.exports = router;