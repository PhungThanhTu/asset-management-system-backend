var model = require('../model/login.model');
var express = require('express');

async function login(req,res) {
    let result = await model.getLoginData(req.params.username,req.params.password);
    res.send(result);
}

module.exports = {login}