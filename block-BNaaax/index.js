var http = require('http');
var path = require('path');
http
  .createServer((req, res) => {
    console.log(__dirname);
    console.log(__filename);
    console.log(path.join(__dirname, 'index.js'));
    res.end('');
  })
  .listen(3000);
