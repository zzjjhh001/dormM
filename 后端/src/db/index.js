var mysql = require('mysql')
exports.base = function(sql,data,callback){
  var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    port:'3306',
    database:'test'
  })
  connection.connect();
  connection.query(sql,data,function(err,result){
    callback(result)
  })
  connection.end();
}