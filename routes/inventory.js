
var express = require('express');
var mssql = require('mssql')

var sql_config = require('../sql_server')

var controller = require('../controller/inventory.controller');
const { route } = require('express/lib/application');

var router = express.Router();

router.post('/add',controller.makeInventory);
router.get('/list',controller.getInventoryList);
router.get('/device/:id',controller.getInventoryDeviceDetail);
router.get('/personnel/:id',controller.getInventoryPersonnelDetail);

module.exports = router;