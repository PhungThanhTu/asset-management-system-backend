var express = require('express');
var mssql = require('mssql')

var sql_config = require('../sql_server')

var router = express.Router();

var controller = require('../controller/device.controller');
const { RoutingEnvChangeToken } = require('tedious/lib/token/token');

router.post('/devices',controller.addManyDevices);
router.get('/query',controller.getDevices);

router.post('/add',controller.addContractAndDevices);

module.exports = router;