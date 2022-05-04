var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

// Create connection to database
var config = {
  server: 'sql8001.site4now.net',
  authentication: {
      type: 'default',
      options: {
          userName: 'db_a8670c_phungthanhtu_admin', // update me
          password: 'Phungthanhtu!1' // update me
      }
  },
  options: {
      database: 'db_a8670c_phungthanhtu'
  }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');
  }
});