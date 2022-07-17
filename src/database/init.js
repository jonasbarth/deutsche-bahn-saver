const redis = require('redis')
const config = require('config')
const url = config.get('database.url')

const client = redis.createClient({
    url: `redis://${url}`
})

client.on('connect', function() {
    console.log('Connected!');
    
    client.set("name", "Flavio")
    client.quit();
});




