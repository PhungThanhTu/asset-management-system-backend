const mysql = require('mysql')

const remoteConnection = {
  host: "sql6.freesqldatabase.com",
  user: "sql6456524",
  password: "b7T7IiiF8C",
  database: "sql6456524"
}

const localConnection = {
  host: "sql6.freesqldatabase.com",
  user: "sql6456524",
  password: "b7T7IiiF8C",
  database: "sql6456524"
}

var con = mysql.createConnection();

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;
