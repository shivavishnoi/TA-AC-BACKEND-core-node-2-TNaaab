var http = require('http');
var qs = require('querystring');
var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var contentType = req.headers['content-type'];
  console.log(contentType);
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (contentType === 'application/json') {
      res.end(store);
    }
    if (contentType === 'application/x-www-form-urlencoded') {
      res.end(JSON.stringify(qs.parse(store)));
    } else {
      res.end(store);
    }
  });
}

server.listen(7000);
