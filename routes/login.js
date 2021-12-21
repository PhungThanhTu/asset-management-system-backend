var express = require('express');
var mssql = require('mssql');

var sql_config = require('../sql_server').sql_config;

var router = express.Router();

var controller = require('../controller/login.controller')

router.get('/:username/:password',controller.login);



router.post('/create',controller.create);


router.get('/test',(req,res) => {
    console.log(req.params);
})

module.exports = router;