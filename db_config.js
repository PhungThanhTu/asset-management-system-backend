const mysql = require('mysql')

var con = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6456524",
  password: "b7T7IiiF8C",
  database: "sql6456524"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;
