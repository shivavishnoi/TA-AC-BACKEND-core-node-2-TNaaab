var http = require('http');
var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    // res.setHeader('Content-Type', 'application/json');
    console.log(store);
    res.write(JSON.stringify(store));
  });
  res.end();
}
server.listen(3456);
