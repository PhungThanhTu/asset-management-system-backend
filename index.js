const express = require('express')
require('dotenv').config();
const app = express()
const port = 3000

// routes 
var login = require('./routes/login');
var device = require('./routes/device');
var contract = require('./routes/contract');

app.use(express.json());
app.use('/login',login);
app.use('/devices',device);
app.use('/contract',contract);



app.get('/',(req,res) => {

})


let server = app.listen(process.env.PORT || 3000, function () {
  console.log(`Server listening on port ${server.address().port}`);
});

