
var express = require('express');
var mssql = require('mssql')

var sql_config = require('../sql_server')

var controller = require('../controller/statistic.controller')

var router = express.Router();


router.get('/year_price',controller.statisticRepairPrice);
router.get('/device_count/:id',controller.deviceCountByDivision);

module.exports = router;