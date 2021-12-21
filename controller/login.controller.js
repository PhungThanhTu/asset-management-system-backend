var model = require('../model/login.model');
var express = require('express');

async function login(req,res) {
    let result = await model.getLoginData(req.params.username,req.params.password);
    res.send(result);
}

async function create(req,res){
    let message =  {
        message:"default"
    }
    let isExist = await model.checkUsernameExist(req.body.username);
    if(isExist === null)
    {
        message.message = "Connection Error";
    }
    if(isExist === true)
    {
        message.message = "Username Exists";
    }
    else
    {
        await model.addnewAccount(req.body.username,req.body.password);
        message.message = "Account created"
    }

    console.log(message);
    res.send(message);
    
}


module.exports = {login,create}