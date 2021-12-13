
var express = require('express');
var mssql = require('mssql')

var sql_config = require('../sql_server')

var router = express.Router();


router.post('/',(req,res) => {
    res.send(req.body);
});


module.exports = router;