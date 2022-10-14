var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var server = http.createServer(handle);
function handle(req, res) {
  var store = '';
  req
    .on('data', (chunk) => {
      store += chunk;
    })
    .on('end', () => {
      if (req.method === 'GET' && req.url === '/form') {
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream('./form.html').pipe(res);
      }
      if (req.method === 'POST' && req.url === '/form') {
        var parsedData = qs.parse(store);
        res.setHeader('Content-Type', 'text/html');
        console.log(parsedData);
        res.end(`<h2>${parsedData.name + ' ' + parsedData.age}</h2>`);
      }
    });
}
server.listen(5678, 'localhost', () => {
  console.log('server created');
});
