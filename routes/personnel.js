
var express = require('express');
var mssql = require('mssql')

var sql_config = require('../sql_server')

var controller = require('../controller/personnel.controller')

var router = express.Router();


router.get('/',controller.list)

router.post('/',controller.add)

router.patch('/',controller.update)

router.delete('/:id',controller.delete_personnel)

router.get('/full_list',controller.listFull)

module.exports = router;