const express = require('express')
require('dotenv').config();
const app = express()
const port = 3000

// routes 
var login = require('./routes/login');
var supplier = require('./routes/supplier')
var contract = require('./routes/contract')
var unit = require('./routes/unit');
var type = require('./routes/type');
var division = require('./routes/division');
var device = require('./routes/device');
var test_api = require('./routes/test_api')

app.use(express.json());
app.use('/login',login);
app.use('/supplier',supplier);
app.use('/contract',contract);
app.use('/unit',unit);
app.use('/type',type);
app.use('/division',division);
app.use('/test_api',test_api);
app.use('/device',device);


app.get('/',(req,res) => {

})


let server = app.listen(process.env.PORT || 3000, function () {
  console.log(`Server listening on port ${server.address().port}`);
});

