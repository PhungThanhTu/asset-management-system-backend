
var express = require('express');
var mssql = require('mssql')

var sql_config = require('../sql_server')

var controller = require('../controller/supplier.controller')

var router = express.Router();


router.get('/list',controller.list)

router.post('/add',controller.add)


module.exports = router;