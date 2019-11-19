// import { createServer } from 'http';

// createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World!');
// }).listen(8080);
var url = require('url');
var http = require('http');
const  fs = require('fs');
var hi = require("./helloWorld");

const readline = require('readline');
let rl = readline.createInterface({
  input: fs.createReadStream('file.txt')
});
let line_no = 0;
let last_line;
// event is emitted after each line
rl.on('line', function(line) {
  line_no++;
  console.log(line);
  last_line = line;
});
// end
rl.on('close', function(line) {
  console.log('Total lines : ' + line_no + last_line);
});

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);