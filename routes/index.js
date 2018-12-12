var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/insertintomongodb/:humidity1/:temperature1/:humidity2/:temperature2/:temperaturedifference', function(req, res, next) {

  MongoClient.connect(url, function(err, db) {

    if (err) throw err;
    var dbo = db.db("iot_smiley");

    var object = { 
      humidity1: req.params.humidity1,
      temperature1: req.params.temperature1,
      humidity2: req.params.humidity2,
      temperature2: req.params.temperature2,
      temperaturedifference: req.params.temperaturedifference
    };

    dbo.collection("temp_data").insertOne(object, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });

  res.send("Data inserted!");
});

module.exports = router;
