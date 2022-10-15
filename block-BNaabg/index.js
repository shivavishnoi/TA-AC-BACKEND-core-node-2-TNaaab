var http = require('http');
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var urlMod = require('url');
const { url } = require('inspector');
const userDir = path.join(__dirname, 'users/');
var server = http.createServer(handleRequest);
function handleRequest(req, res) {
  var pathname = urlMod.parse(req.url).pathname;
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    //POST
    if (req.method == 'POST' && pathname === '/users') {
      var username = JSON.parse(store).username;
      var fullPath = path.join(userDir + `${username}.json`);
      // console.log(fullPath);
      if (!fs.existsSync(fullPath)) {
        fs.open(fullPath, 'wx', (err, fd) => {
          if (err) {
            res.end(`error in file management`);
          }
          fs.writeFile(fd, store, (err) => {
            if (err) {
              res.end(`error occured while writing a file`);
            }
            fs.close(fd, (err) => {
              if (!err) res.end(`${username} successfully created`);
            });
          });
        });
      } else {
        res.end(`user already exist`);
      }
    }
    //GET
    else if (req.method === `GET` && pathname === '/users') {
      var parsedData = urlMod.parse(req.url);
      var username = parsedData.query.split('=')[1];
      fs.readFile(userDir + `${username}.json`, (err, userData) => {
        if (err) {
          res.statusCode = 404;
          res.end(`User mentioned does not exist`);
        }
        res.end(userData);
      });
      // res.end();
    }
    //DELETE
    else if (req.method === 'DELETE' && pathname === '/users') {
      var parsedData = urlMod.parse(req.url);
      var username = parsedData.query.split('=')[1];
      fs.unlink(userDir + `${username}.json`, (err) => {
        if (err) {
          res.end('User Does not Exist');
        }
        res.end(username + ' Deleted');
      });
    }
    //UPDATE
    else if (req.method === 'PUT' && pathname === '/users') {
      var parsedData = urlMod.parse(req.url);
      var username = parsedData.query.split('=')[1];
      fs.open(userDir + `${username}.json`, 'r+', (err, fd) => {
        if (err) {
          res.end(`User Does nor exist`);
        }
        fs.ftruncate(fd, 0, (err) => {
          if (err) {
            res.end(`error while truncating existing file`);
          }
          fs.writeFile(fd, store, (err) => {
            if (err) {
              res.end(`error while writing the file`);
            }
            fs.close(fd, (err) => {
              if (!err) res.end('user Updated Successfully');
            });
          });
        });
      });
    }
    //else
    else {
      res.statusCode == 404;
      res.end(`Error 404: Page not Found`);
    }
  });
}
server.listen(3000, 'localhost', () => {
  console.log('started');
});
