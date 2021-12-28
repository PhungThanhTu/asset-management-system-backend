var model = require('../model/transfer.model');
var express = require('express');


async function getTransfer(req,res)
{   
    try
    {
        let result = await model.getTransfers();
        res.send(result);
    }
    catch
    {
        res.send({
            "message":"An error has occured, please try again"
        })
    }
}

async function getTransferDetail(req,res)
{
    try {
        let result = await model.getDetailedTransferById(req.params.id);
        res.send(result);
    }
    catch
    {
        res.send({
            "message":"An error has occured, please try again"
        })
    }
}

async function execTransfer(req,res)
{   
    console.log("user attempt to transfer some device with these infomation :");
    console.log(req.body);
    // declare result
    let message = {
        message:"default"
    }
    try {
        let result = await model.addDevices(req.body);
        message.message = "User transfered devices from " +req.body.transfer.sender + " to " + req.body.transfer.receiver + ", affected " + result + (result == 1? " row": " rows");
    }
    catch
    {
        message.message = "Error ocurred, please try again"
    }
    res.send(message);
}

module.exports = {getTransfer,getTransferDetail,execTransfer}