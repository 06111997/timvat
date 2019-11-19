var express =require('express');
var fs = require('fs');
var app = express();
var path = require('path');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const csrfMiddleware = csurf({
  cookie: true
});
// app.use(cookieParser());
// app.use(csrfMiddleware);

var PORT = process.env.PORT || 3000;
app.use(express.static(__dirname));
app.use(express.static('client'));

app.get('/', function(req, res){
  res.sendFile('httpClient.html', {root:path.join(__dirname,'./client')});
});

app.post('/reloadMap',function(req,res){
  const readline = require('readline');
  let rl = readline.createInterface({
    input: fs.createReadStream('file.txt')
  });
  let line_no = 0;
  let last_line;

  rl.on('line', function(line) {
    line_no++;
    last_line = line;
  });
  rl.on('close', function() {
    res.status(200).send(last_line);
  });
});

app.post('/sendDataToServer',function(req,res){
  //console.log(req._parsedOriginalUrl.query);
  let uluru = {lat: 21.00136, lng: 105.8484633};
  const rad = Math.floor(Math.random() * 49) + 1;
  uluru.lng = uluru.lng + 0.00002 *  rad;
  uluru.lat = uluru.lat + 0.00002 * (1 - 1 / rad);
  fs.appendFile('file.txt','\n' + JSON.stringify(uluru), function (err) {
    if (err) throw err;
    console.log('Updated!');
    res.status(200).send("loaded");
  });
});

app.get('*', function(req, res){
  res.status(404).send('404 NOT FOUND');
});

app.listen(PORT,function(){
  console.log("SERVER LISTEN ON "+ PORT);
})