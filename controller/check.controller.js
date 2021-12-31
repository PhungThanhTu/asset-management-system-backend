
var express = require('express');
var model = require('../model/check.model')

async function doChecking(req,res)
{
    console.log("user attempt to check some device with these infomation :");
    console.log(req.body);
    console.log("JSON data is : ");
    console.log(JSON.stringify(req.body));
    // declare result
    let message = {
        message:"default"
    }
    try {
        let result = await model.checkDevices(req.body)
        message.message = "User start checked device  , affected " + result + (result == 1? " row": " rows");
    }
    catch
    {
        message.message = "Error ocurred, please try again"
    }
    res.send(message);
}

async function getCheckLogs(req,res)
{
    try
    {
        let result = await model.listCheckLog();
        res.send(result);
    }
    catch
    {
        res.send({
            "message":"An error has occured, please try again"
        })
    }
}

async function checkLogDetailById(req,res)
{
    try {
        let result = await model.listCheckLogDetail(req.params.id)
        res.send(result);
    }
    catch
    {
        res.send({
            "message":"An error has occured, please try again"
        })
    }
}

module.exports = {doChecking,getCheckLogs,checkLogDetailById}