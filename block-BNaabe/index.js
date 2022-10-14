var path = require('path');
var http = require('http');
var qs = require('querystring');
// console.log(__filename);
// console.log(path.join(__dirname, "app.js"))
// let relPath = "./index.html"
// console.log(path.join(__dirname, "index.html"))

//2
// var server = http.createServer(handleRequest);
// function handleRequest(req, res) {
//   var contentType = req.headers['content-type'];
//   var store = '';
//   req.on('data', (chunk) => {
//     store += chunk;
//   });
//   req.on('end', () => {
//     if (req.url === '/') {
//       res.statusCode = 201;
//       res.write(store);
//     }
//     if (
//       contentType === 'application/x-www-form-urlencoded' &&
//       req.url === '/captain'
//     ) {
//       var parsedData = qs.parse(store);
//       res.write(parsedData.captain);
//     }
//     res.end();
//   });
// }
// server.listen(2000, 'localhost', () => {
//   console.log('server started');
// });

//3 & 4
var server = http.createServer(handleRequest);
function handleRequest(req, res) {
  var contentType = req.headers['content-type'];
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (contentType == 'application/x-www-form-urlencoded') {
      var parsedData = qs.parse(store);
      res.setHeader('Content-Type', 'text/html');
      res.end(`<h2>${parsedData.email}</h2>`);
    } else if (contentType === 'application/json') {
      res.setHeader('Content-Type', 'text/html');
      // console.log(store, typeof store);
      let obj = JSON.parse(store);
      let name = obj.name;
      let email = obj.email;
      res.write(`<h1>${name}</h1><h2>${email}</h2>`);
      res.end();
    } else {
      res.end(store);
    }
  });
}
server.listen(2000, 'localhost', () => {
  console.log('server started');
});
