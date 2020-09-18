var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http')
var logging = require('./routes/logging');
var redis = require('redis');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
global.app = app;

require('./modules/scrapping');

let port = 3009;
var startServer = http.createServer(app).listen(port, () => {
    connectRedis();
    logging.log('into startServer')
});

function connectRedis() {
        let redis_port = 6379;
        redis_client = redis.createClient(redis_port);
        redis_client.on('connect', function () {
        logging.log('connected to redis');
        });
}

process.on("uncaughtException", function (err) {
    logging.log("uncaughtException", err);
    startServer.close();
    try {
        connection.end(function (errPoll) {
            if (errPoll) {
                logging.log("errPoll inside")
            }
            logging.log("end poll")
        })
    } catch (error) {
        logging.log("errPoll", error)
    }
    setTimeout(function () {
        process.exit(0);
    }, 15000);
})