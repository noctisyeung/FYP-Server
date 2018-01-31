var express = require('express');
var MongoClient = require('mongodb').MongoClient; 
var assert = require('assert');
var app = express();
var bodyParser = require('body-parser');
var mongourl = 'mongodb://noctis:123456@ds141434.mlab.com:41434/noctisyeung';
var ObjectId = require('mongodb').ObjectID;
var apikey = '0d8144c5-4df7-4953-b813-f1104fe86dd1';


//The below part is setting up the requirement

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public")); // mkdir for css file  //Get query from the form
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.post('/test' ,  function(req, res, next) {
    var userInfo = {};
    var score = {};
    var datetime = new Date();
    var clientapi = req.body.api;
    var currentlevel = req.body.currentlevel;
    userInfo['username'] = req.body.username;
    score['date'] = datetime;
    score['level' + currentlevel] = req.body.levelscore;
    userInfo['Score'] = score;
    if (clientapi == apikey){
    MongoClient.connect(mongourl, function(err, db) {
        assert.equal(err,null);
        console.log('Connected to MongoDB\n');
        addUser(db,userInfo,function(result){
        db.close();
        console.log('/main disconnected to MongoDB\n');
        res.status(200);
        res.send("OK")
        });
        });
    }
    else
    res.status(402);
});

function addUser(db,new_user,callback){ //This function is using with /doRegister doing insert
    db.collection('fypprototype').insert(new_user,function(err,result){
    assert.equal(err,null);
    console.log('User Created');
    callback(result);
    });
};

app.listen(process.env.PORT || 8099);