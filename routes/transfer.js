
var express = require('express');
var mssql = require('mssql')

var sql_config = require('../sql_server')

var controller = require('../controller/transfer.controller')

var router = express.Router();


router.get('/list',controller.getTransfer);
router.get('/detail/:id',controller.getTransferDetail);
router.post('/add',controller.execTransfer);


module.exports = router;