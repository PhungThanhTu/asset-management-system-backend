
var express = require('express');
var mssql = require('mssql')

var sql_config = require('../sql_server')

var controller = require('../controller/supplier.controller')

var router = express.Router();


router.get('/',controller.list)

router.post('/',controller.add)

router.patch('/',controller.update)

router.delete('/',controller.delete_supplier)


module.exports = router;