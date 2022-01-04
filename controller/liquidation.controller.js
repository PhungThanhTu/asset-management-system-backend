
var express = require('express');
var model = require('../model/liquidation.model')

async function liquidate(req,res)
{
    console.log("user attempt to liquidate devices with these infomation :");
    console.log(req.body);
    console.log("JSON data is : ");
    console.log(JSON.stringify(req.body));
    // declare result
    let message = {
        message:"default"
    }
    try {
        let result = await model.startLiquidation(req.body)
        message.message = "New liquidation has been made  , affected " + result + (result == 1? " row": " rows");
    }
    catch
    {
        message.message = "Error ocurred, please try again"
    }
    res.send(message);
}

async function getLiquidationList(req,res)
{
    try
    {
        let result = await model.getLiquidationList();
        res.send(result);
    }
    catch
    {
        res.send({
            "message":"An error has occured, please try again"
        })
    }
}

async function getLiquidationDeviceDetail(req,res)
{
    try {
        let result = await model.getLiquidationDeviceDetail(req.params.id);
        res.send(result);
    }
    catch
    {
        res.send({
            "message":"An error has occured, please try again"
        })
    }
}


async function getLiquidationPersonnelDetail(req,res)
{
    try {
        let result = await model.getLiquidationPersonnel(req.params.id);
        res.send(result);
    }
    catch
    {
        res.send({
            "message":"An error has occured, please try again"
        })
    }
}

async function getLiquidatingDeviceByDivision(req,res)
{   
    console.log("liquidating device by division ",req.query.division);

    try
    {
        let result = await model.listNeedLiquidatingDeviceByDivision(req.query.division);
        res.send(result);
    }
    catch 
    {
        res.send({
            message:"An error occured, please try again"
        })
    }
}


module.exports = {liquidate,getLiquidationList,getLiquidationPersonnelDetail,getLiquidationDeviceDetail,getLiquidatingDeviceByDivision}