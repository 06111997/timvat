//npm install sqlite3 
//npm install  bluebird 
//file data.js này  và file database  cùng chung thư mục với file nodejs của server
const sqlite=require('sqlite3')
const promise =require('bluebird')
//tạo database cha
class Database
{   //khởi tạo kết nối với database có đường dẫn path
    constructor(path)
    {
        this.db=new sqlite.Database(path,(err)=>{
            if(err)
            {
                console.log("Can not connect database ",err);
            }
            else{
                console.log("Connect database ",path);
            }
        })

    }
    // thực thi câu lệnh sql 
    runQuery(sql,params=[])
    {
    return new Promise((resolve,reject)=>{
        this.db.run(sql,params,function(err){
            if(err){
                console.log('error running sql '+sql)
                console.log(err)
                reject(err)
            }
            else{
                resolve({ id: this.lastID })
            }
        })
    })
    }
    //lấy 1 bản ghi của câu truy vấn sql
    get(sql,params=[]){
        return new Promise((resolve,reject)=>{
            this.db.get(sql,params,(err,row)=>{
                if(err){
                    console.log('error running sql '+sql)
                    console.log(err)
                    reject(err)
                }
                else{
                    resolve(row)
                }
            })
        })
    }
    //đóng database
    close( )
    {
        this.db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Close the database connection.');
          })
    }

}

//lớp thực thi rõ hơn
class DataApp extends Database{
    //khởi tạo
    constructor(path){
        super(path)
    }
    //tạo bảng Message có 2 trường id,MessageSim
    createTable()
    {
        const sql='CREATE TABLE IF NOT EXISTS Message'+
        '(id INTEGER PRIMARY KEY AUTOINCREMENT,MessageSim TEXT)'
        return this.runQuery(sql);
    }
    //insert  1 bản ghi có  MessageSim=message
    insertTable(message)
    {
        const sql='INSERT INTO Message(message) VALUES (?)'
        return this.runQuery(sql,[message])
    }
    //lấy bản ghi mới nhất 
    getLast()
    {
        const sql='SELECT * FROM Message ORDER BY ID DESC LIMIT 1'
       return this.get(sql)
        
    }
    //xóa bảng
    deleteTable()
    {
        const sql='DROP TABLE IF EXISTS Message'
        return this.runQuery(sql)
    }

}
// cái này dùng để  các file khác require dùng được DataApp
module.exports=DataApp