
var express = require('express');
var mssql = require('mssql')

var sql_config = require('../sql_server')

var controller = require('../controller/repair.controller')

var router = express.Router();


router.get('/spoiled',controller.listSpoiled)
router.get('/bill',controller.listBill);
router.get('/detail/:id',controller.getRepairBillDetail);
router.post('/add',controller.repair);

module.exports = router;

