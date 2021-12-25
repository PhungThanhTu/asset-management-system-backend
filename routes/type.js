
var express = require('express');
var mssql = require('mssql')

var sql_config = require('../sql_server')

var controller = require('../controller/type.controller');

var router = express.Router();

router.get('/',controller.list);


module.exports = router;