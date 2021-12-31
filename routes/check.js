
var express = require('express');
var mssql = require('mssql')

var sql_config = require('../sql_server')

var controller = require('../controller/check.controller')

var router = express.Router();


router.post('/add',controller.doChecking);
router.get('/list',controller.getCheckLogs);
router.get('/id/:id',controller.checkLogDetailById);

module.exports = router;