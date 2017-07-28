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
    var participant = {
        name: req.body.name,
        fathername: req.body.fathername,
        dob: req.body.dob,
        camp: req.body.camp
    }
    var insertDocuments = function (db, callback) {
        // Get the documents collection 
        var collection = db.collection('participants');
        // Insert some documents 
        collection.insert({ participant }, function (err, result) {
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

app.post('/manage/filter', (req, res) => {
    //text fields
    var search = {
        name: req.body.searchbyname,
        fName: req.body.searchByFathersName,
        camp: req.body.searchByCamp,
        date:  req.body.searchByDob
    }
    //C- checkboxes
    var CName = req.body.name;
    var CFName = req.body.fName;
    var CDob = req.body.DOB;
    var CCamp = req.body.camp;

    for (var i = 0; i < search.length; i++) {
        if (search[i] != 'empty') {
            nonempty[i] = search[i];
        }
    }
    var NEL = nonempty.length;
    if (date != "1111-11-11") {
        nonempty[NEL + 1] = date;
    }


    /*
    if (date != "1111-11-11") {
        nonempty = date;
    }*/
    console.log(nonempty);
});
/*
//render logic or none is checked
//if all are checked
if ((CName == 1 && CFName == 1 && CDob == 1 && CCamp == 1) || (CName == 0 && CFName == 0 && CDob == 0 && CCamp == 0)){

    var findDocuments = function (db, callback) {
        // Get the documents collection 
        var collection = db.collection('participants');
        // Find some documents 
        collection.find(
            {
                "participant.name":Name,
                "participant.fathername": FName,
                "participant.dob": Dob,
                "participant.camp": Camp 
            }
        ).toArray(function (err, docs) {
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
} 
//if only Name is checked
if (CName[1] == 1 && CFName == 0 && CDob == 0 && CCamp == 0) {

    var findDocuments = function (db, callback) {
        // Get the documents collection 
        var collection = db.collection('participants');
        // Find some documents 
        collection.find(
            {
                "participant.name": Name
            }
        ).toArray(function (err, docs) {
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
}

if ( Name != "empty"  && FName != "empty" && Dob != "1111-11-11" && Camp != "empty"){

    var findDocuments = function (db, callback) {
        // Get the documents collection 
        var collection = db.collection('participants');
        // Find some documents 
        collection.find(
            {
                "participant.name":Name,
                "participant.fathername": FName,
                "participant.dob": Dob,
                "participant.camp": Camp 
            }
        ).toArray(function (err, docs) {
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
} 

if ( Name != "empty"  && FName != "empty" && Dob != "1111-11-11" && Camp != "empty"){

    var findDocuments = function (db, callback) {
        // Get the documents collection 
        var collection = db.collection('participants');
        // Find some documents 
        collection.find(
            {
                "participant.name":Name,
                "participant.fathername": FName,
                "participant.dob": Dob,
                "participant.camp": Camp 
            }
        ).toArray(function (err, docs) {
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
} 




})
*/


//server starter
app.listen(3000, () => {
    console.log('server started at port 3000');
})