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
var transfer = require('./routes/transfer')
var check = require('./routes/check')
var personnel = require('./routes/personnel')
var inventory = require('./routes/inventory')
var liquidation = require('./routes/liquidation')
var repairer = require('./routes/repairer')
var repair = require('./routes/repair')
var statistic = require('./routes/statistic')
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
app.use('/transfer',transfer);
app.use('/check',check);
app.use('/personnel',personnel);
app.use('/inventory',inventory);
app.use('/liquidation',liquidation);
app.use('/repair',repair);
app.use('/repairer',repairer);
app.use('/statistic',statistic)
app.get('/',(req,res) => {

})


let server = app.listen(process.env.PORT || 3000, function () {
  console.log(`Server listening on port ${server.address().port}`);
});

