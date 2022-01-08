
var express = require('express');
var mssql = require('mssql')

var sql_config = require('../sql_server')

var controller = require('../controller/liquidation.controller');
const { route } = require('express/lib/application');

var router = express.Router();

router.post('/add',controller.liquidate);
router.get('/list',controller.getLiquidationList);
router.get('/query',controller.getLiquidatingDeviceByDivision);
router.get('/devices/:id',controller.getLiquidationDeviceDetail);
router.get('/personnel/:id',controller.getLiquidationPersonnelDetail);
router.get('/years',controller.getLiquidationYear);
router.get('/:year',controller.getLiquidatingDeviceByYear);

module.exports = router;