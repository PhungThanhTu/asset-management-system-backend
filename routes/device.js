var express = require('express');



var router = express.Router();

var controller = require('../controller/device.controller');


router.post('/devices',controller.addManyDevices);
router.get('/query',controller.getDevices);

router.post('/add',controller.addContractAndDevices);
router.get('/detail/:id',controller.getDeviceById);
router.get('/list',controller.getDeviceList);

module.exports = router;