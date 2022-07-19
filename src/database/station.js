const config = require('config')
const url = config.get('database.url')
const fs = require('fs');

var MongoClient = require('mongodb').MongoClient;

/**
 * Reads and parses all of the Deutsche Bahn stations that exists in the db_all_stations.json file.
 */
function getAllStations() {
    let data = fs.readFileSync('assets/db_all_stations.json');
    let stations = JSON.parse(data);
    return stations
}

MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    var dbo = db.db("deutsche-bahn");
    console.log(stations)
    dbo.collection("station").insertMany(getAllStations(), function(err, res) {
        if (err) throw err;
        console.log(`${stations.length} documents inserted`);
        db.close();
    });
});


