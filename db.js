var mysql = require('mysql2');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'dipesh@123',
    database : 'todoapp'
});

connection.connect((err) => {
    if(err){
        console.log(err);
    } else {
        console.log("CONNECTED...");
    }
})

module.exports = connection;