const sql = require("mysql");
var db= sql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'noteTracker'
})
db.connect((err) =>{
    if(err){
        throw err;
    }else{
        console.log("Database is working...");
    }
});

module.exports = db