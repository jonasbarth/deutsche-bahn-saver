const config = require('config')
const url = config.get('database.url')

var MongoClient = require('mongodb').MongoClient;

function writeStop(stop) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        dbo.collection("stop").insertMany(stop, function(err, res) {
            if (err) throw err;
            console.log(`${JSON.stringify(stop)} was inserted`);
            console.log(`${JSON.stringify(res)}`);
            db.close();
        });
    });
}

module.exports = writeStop;