
var express = require('express');
var mssql = require('mssql')

var sql_config = require('../sql_server')

var controller = require('../controller/check.controller')

var router = express.Router();


router.post('/add',controller.doChecking);


module.exports = router;