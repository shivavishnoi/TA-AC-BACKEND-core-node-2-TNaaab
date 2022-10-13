var fs = require('fs');
var http = require('http');
var { EventEmitter } = require('events');
var myEmitter = new EventEmitter();
fs.writeFile(
  'readme.txt',
  'Hello Hello Hello Hello HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
  (err) => {
    if (err) console.log(err);
    console.log(`saved`);
  }
);

var server = http.createServer();
server.on(`request`, (req, res) => {
  var reader = fs.createReadStream('readme.txt').pipe(res);
  // req.on('data');
});
server.listen(3000);
