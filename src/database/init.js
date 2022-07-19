const config = require('config')
const url = config.get('database.url')

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("deutsche-bahn");
    
    dbo.createCollection("stop", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });

    db.createCollection("station", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});
