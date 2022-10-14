var path = require('path');
var qs = require('querystring');
var url = require('url');
var fs = require('fs');
// console.log(path.join(__dirname, 'client/index.js'));

var http = require('http');
var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var store = '';
  var parsedUrl = url.parse(req.url);
  var pathname = parsedUrl.pathname;
  // console.log(req.headers['content-type']);
  if (req.method === 'GET' && pathname === '/form') {
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream('./form.html').pipe(res);
  }
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    let data = qs.parse(store);
    // console.log();
    res.end(JSON.stringify(data));
  });
  // console.log(req.url, store);
}

server.listen(5678, 'localhost', () => {
  console.log('server created');
});
