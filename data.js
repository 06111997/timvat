const sqlite=require('sqlite3')
const promise =require('bluebird')

class Database
{
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


class DataApp extends Database{
    constructor(path){
        super(path)
    }
    createTable()
    {
        const sql='CREATE TABLE IF NOT EXISTS Message'+
        '(id INTEGER PRIMARY KEY AUTOINCREMENT,message TEXT)'
        return this.runQuery(sql);
    }
    insertTable(message)
    {
        const sql='INSERT INTO Message(message) VALUES (?)'
        return this.runQuery(sql,[message])
    }
    getLast()
    {
        const sql='SELECT * FROM Message ORDER BY ID DESC LIMIT 1'
       return this.get(sql)
        
    }
    deleteTable()
    {
        const sql='DROP TABLE IF EXISTS Message'
        return this.runQuery(sql)
    }

}

module.exports=DataApp