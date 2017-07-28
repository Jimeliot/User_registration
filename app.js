//setting up dependencies
var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
var expressvalidator = require('express-validator');
var ObjectId = require('mongodb').ObjectID;

var app = express();
//connecting to database
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL 
var url = 'mongodb://localhost:27017/TW';
// Use connect method to connect to the Server 
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    db.close();
});

//setting up the server environment
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(expressvalidator());
app.use(express.static(path.join(__dirname, 'public')));

//home page
app.get('/', (req, res) => {
    res.render('index');
});

//manage page- Lists all users by default
app.get('/manage', (req, res) => {
    var findDocuments = function (db, callback) {
        // Get the documents collection 
        var collection = db.collection('participants');
        // Find some documents 
        collection.find({}).toArray(function (err, docs) {
            assert.equal(err, null);
            res.render('manage', {
                docs: docs
            });
            // console.log(docs);
            callback(docs);
        });
    }
    MongoClient.connect(url, function (err, db) {
        findDocuments(db, function () {
            db.close();
        });
    });


});

//add users to DB
app.post('/add', (req, res) => {
    var insertDocuments = function (db, callback) {
        // Get the documents collection 
        var collection = db.collection('participants');
        // Insert some documents 
        collection.insert({name: req.body.name, fathername: req.body.fathername, dob: req.body.dob, camp: req.body.camp }, function (err, result) {
            assert.equal(null, err);
            console.log("Inserted participant in the collection");
            callback(result);

        });
        res.redirect('/');
    }

    // Use connect method to connect to the Server 
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        insertDocuments(db, function () {
            db.close();
        });
    });
});

//delete users from DB
app.delete('/delete/part/:id', function (req, res) {

    var deleteDocument = function (db, callback) {
        // Get the documents collection 
        var collection = db.collection('participants');
        // Insert some documents 
        collection.deleteOne({ "_id": ObjectId(req.params.id) }, function (err, result) {
            assert.equal(err, null);
            console.log("Removed the participant");
            callback(result);
        });
    }
    // Use connect method to connect to the Server 
    MongoClient.connect(url, function (err, db) {
        deleteDocument(db, function () {
        });
    });
    console.log(req.params.id)
})


//filter users

app.get('/manage/filter/:name/:fname/:dob/:camp', (req, res) => {
    //text fields
    var search = {}
    if (req.params.name!='nil'){
    search.name=req.params.name;
    }
    if (req.params.fname!='nil'){
        search.fathername=req.params.fname;
    }
    if(req.params.dob!='0001-01-01'){
        search.dob=req.params.dob;
    }
    if(req.params.camp!='nil'){
        search.camp=req.params.camp;
    }
    console.log(search)
var findDocuments = function (db, callback) {
        // Get the documents collection 
        var collection = db.collection('participants');
        // Find some documents 
        collection.find(search).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.dir(docs);
            callback(docs);
        });
    }
    MongoClient.connect(url, function (err, db) {
        findDocuments(db, function () {
            db.close();
        });
    });
});

//if only Name is checked

//server starter
app.listen(3000, () => {
    console.log('server started at port 3000');
})