var router = express.Router();
router.get('/:id', function (req,res) {
    var id = req.params.id;
    var nameTable;
    var param = {};
    switch (id){
        case '1':
            nameTable ='java';
            param.main = "I'm Java !";
            param.name = 'Java';
            param.link = '/images/java.png';
            param.language = 1;
            break;
        case '2':
            nameTable = 'android';
            param.main = "I'm Android !";
            param.name = 'Android';
            param.link = '/images/android.jpg';
            param.language = 2;
            break;
        case '3':
            nameTable = 'nodejs';
            param.main = "I'm Nodejs !";
            param.name = 'NodeJs';
            param.link = '/images/nodejs.jpg';
            param.language = 3;
            break;
        case '4':
            nameTable = 'c';
            param.main = "I'm C/C++ !";
            param.name = 'C/C++';
            param.link = '/images/c.jpg';
            param.language = 4;
            break;
        default:
            res.redirect('/');
            return;
    }
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

router.get('/:idLanguage/:idPost', function (req,res) {
    var idLanguage = req.params.idLanguage;
    var idPost = req.params.idPost;
    var nameTable;
    var param = {};
    switch (idLanguage){
        case '1':
            nameTable ='java';
            param.name = 'Java';
            param.link = '/images/java.png';
            break;
        case '2':
            nameTable = 'android';
            param.name = 'Android';
            param.link = '/images/android.jpg';
            break;
        case '3':
            nameTable = 'nodejs';
            param.name = 'NodeJs';
            param.link = '/images/nodejs.jpg';
            break;
        case '4':
            nameTable = 'c';
            param.name = 'C/C++';
            param.link = '/images/c.jpg';
            break;
        default:
            res.redirect('/');
            return;
    }
    MongoClient.connect(url, function (err, db) {
        if(err){
            res.redirect('/');
            return;
        }
        var collection = db.collection(nameTable);
        try {
            collection.find({_id:new ObjectID(idPost)}, {title:1, content:1,_id:0}).toArray(function (err, docs) {
                if(docs.length === 0 ){
                    res.redirect('/');
                    return;
                }
                param.main = docs[0].title;
                param.content =docs[0].content;
                param.title = docs[0].title;
                res.render('programming/post',param);
            });
        }catch (err){
            res.redirect('/programming/'+ idLanguage);
        }
        finally {
            db.close();
        }

    });

});

module.exports = router;