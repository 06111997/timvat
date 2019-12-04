var express =require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser')
// gọi module DataApp, './data' link  đường dẫn đến tên file tạo lớp DataApp
var DataApp=require('./data')

const http = require('http').createServer(app);
var path = require('path');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const csrfMiddleware = csurf({
  cookie: true
});
//tạo đối tượng database liên kết với database
const database=new DataApp('database')
database.createTable();


// parse application/json
app.use(bodyParser.json())

var PORT = process.env.PORT||3000 ;
app.use(express.static(__dirname));
app.use(express.static('client_nguyen_anh'));
app.get('*', function(req, res){
  res.sendFile('httpClient.html', {root:path.join(__dirname,'./client_nguyen_anh')});
});
app.post('/sendPhone',function(req,res){
  console.log(req.body);
});

app.post('/reloadMap',function(req,res){
//lấy bản ghi cuối cùng lưu ở biến result có format {id:"2", MessageSim:"CLBS: 0,105.852831,21.006396,550    OK"}
  database.getLast().then(result=>{
    
    var arr,send_data;
     arr=result.MessageSim.split(",")
     /* arr[0]="CLBS: 0"
         arr[1]="105.852831"
         arr[2]="21.006396"
         arr[3]="550    OK"
     */
    //tạo chuỗi json gửi client browser
     send_data={lng:parseFloat(arr[1]),lat:parseFloat(arr[2])};
  console.log(JSON.stringify(send_data))
    res.status(200).send(JSON.stringify(send_data));
  
}
  )

});
//nhận từ thiết bị sim
app.post('/sendDataToServer',function(req,res){
  
  database.insertTable(req.body.MessageSim)
});

app.get('*', function(req, res){
  res.status(404).send('404 NOT FOUND');
});

http.listen(PORT,"0.0.0.0",function(){
  console.log("SERVER LISTEN ON "+ PORT);
})