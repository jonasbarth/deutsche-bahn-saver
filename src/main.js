var path = require("path")
var PROTO_PATH = path.resolve('assets/timetable.proto');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
const cron = require('node-cron');
const config = require('config')
const url = config.get('acquisition-server.url')
var writeStop = require('service/writer/stopWriter')


var argv = require('minimist')(process.argv.slice(2));

const eva = argv["eva"]

// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

cron.schedule('*/2 * * * *', () => {
    var client = new protoDescriptor.TimetableService(url, grpc.credentials.createInsecure());
    const timestamp = Math.round(Date.now() / 1000) - 120;
    var request = {eva: eva, departedAfter: timestamp}

    let responses = []

    console.log(`Sending ${JSON.stringify(request)} to ${url}`)
    var call = client.getDepartedAfter(request);
    call.on('data', function(response) {
        console.log(`Got ${JSON.stringify(response)}`);
        responses.push(response);
    });
    call.on('error', (err) => {
        console.error(err);
    });
    call.on('end', () => {
        console.log(`Ending response. Writing ${responses.length} stops.`);
        writeStop(responses);
    })
  });
